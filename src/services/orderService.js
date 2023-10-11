import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Order } from "../db/models/orderModel.js";
import { User } from "../db/models/userModel.js";
import { Products } from "../db/models/productModel.js";
import { NonMember } from "../db/models/nonMemberModel.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ObjectId = mongoose.Types.ObjectId;
const SECRET_KEY = process.env.SECRET_KEY;

class OrderService {
  // 사용자 주문 구현해야 함.
  async getUserInfo(token) {
    // token 값이 null인 경우 보낼 기본 회원 정보가 없다.
    if (!token) {
      return {
        stauts: 200,
        message: "로그인이 되어 있지 않으므로 보낼 기본 회원 정보가 없습니다.",
      };
    }

    // 토큰이 있을 경우 유효한지 확인하고, 유효하다면 해독하여 그 안에 있는 회원 정보(이메일)을 가지고 해당 유저 정보 찾아내기
    // 관리자의 경우 주문 불가하다고 하기
    try {
      const decoded = await jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
          return err;
        } else {
          return decoded;
        }
      });

      // 토큰이 유효하지 않을 경우 오류 메세지 반환
      if (!decoded) {
        return {
          status: 400,
          errMsg: "토큰이 유효하지 않습니다.",
        };
      }

      // 토큰 해독 결과 관리자인 경우 관리만 가능하도록 한다.
      if (decoded.isAdmin) {
        return {
          status: 400,
          errMag: "관리자의 경우 주문이 아닌 관리만 가능합니다.",
        };
      }

      // 토큰이 유효하고 관리자가 아니면 해당 user 정보 찾기
      const userInfo = await User.findOne({ email: decoded.email });
      const { email, username, address, phone } = userInfo;
      return {
        status: 200,
        message: "기본 회원 정보를 가져오는 것에 성공하였습니다.",
        userInfo: { username, address, phone, email },
      };
    } catch (err) {
      return err;
    }
  }

  // 주문서 보내기
  async postOrderSheet(
    orderer,
    orderPassword,
    checkPassword,
    orderAddress,
    orderPhone,
    email,
    products,
    totalPrice,
    paidThrough
  ) {
    // orderPassword가 작성되지 않아 undefined로 전달되었다면, 이것은 회원의 주문이므로 Order DB에 저장할 때 비밀번호는 null로 저장
    try {
      let orderProducts = [];
      for (let product of products) {
        const { curProduct, count, size } = product;
        const targetProduct = await Products.findOne({
          productName: curProduct.productName,
          productImg: curProduct.productImg,
        });
        // 구매하려 하는 상품이 존재하지 않는 경우 해당 상품은 존재하지 않는다고 알려야 한다.
        if (!targetProduct) {
          return {
            status: 400,
            err: `${curProduct.productName}은 현재 존재하지 않는 상품입니다.`,
          };
        }
        // 상품이 존재하면 주문할 상품 배열에 정보 push하기
        orderProducts.push({
          products: new ObjectId(targetProduct._id),
          count,
          size,
        });
      }

      // 회원이어서 주문 비밀번호를 따로 입력할 필요가 없는 경우 주문 비밀번호를 null로 저장
      if (!orderPassword) {
        // 회원이므로 유저 정보도 찾아 같이 저장
        const user = await User.findOne({ email });
        const newOrder = await Order.create({
          deliveryStatus: "주문 완료",
          orderProducts,
          totalPrice,
          orderDate: new Date(),
          user,
          orderer,
          orderPassword: null,
          email,
          orderAddress,
          orderPhone,
          paidThrough,
        });

        return {
          status: 200,
          message: "주문이 정상적으로 완료되었습니다.",
          orderId: newOrder._id,
        };
      } else {
        // 비회원일 경우 주문 비밀번호를 입력하므로 비밀번호가 일치하는지 확인하고, 해시화하여 저장한다.
        if (orderPassword !== checkPassword) {
          return {
            status: 400,
            errMsg:
              "비밀번호와 비밀번호 확인이 일치하지 않습니다. 다시 확인해 주세요.",
          };
        }
        const hashedOrderPassword = await bcrypt.hash(orderPassword, 5);

        // 비회원 (로그인이 안 되어 있을 경우)일 경우 user는 null이다.
        const newOrder = await Order.create({
          deliveryStatus: "주문 완료",
          orderProducts,
          totalPrice,
          orderDate: new Date(),
          user: null,
          orderer,
          orderPassword: hashedOrderPassword,
          email,
          orderAddress,
          orderPhone,
          paidThrough,
        });

        return {
          status: 200,
          message: "주문이 정상적으로 완료되었습니다.",
          orderId: newOrder._id,
        };
      }
    } catch (err) {
      return {
        status: 400,
        errMsg: err,
      };
    }
  }

  // 관리자 주문 관리 목록 => 모든 주목 목록을 가져옴
  async getAllOrdersList() {
    try {
      // Order 컬렉션에서 모든 주목 목록들을 가져온다.
      const allOrders = await Order.find({})
        .populate("user")
        .populate("orderProducts.products");

      if (!allOrders.length) {
        return {
          status: 200,
          message: "구매자들의 주문 내역이 존재하지 않습니다.",
        };
      } else {
        return {
          allOrders,
        };
      }
    } catch (err) {
      return {
        status: 400,
        errMsg: "모든 주문 목록을 가져오는 데 오류가 발생했습니다.",
        err,
      };
    }
  }

  // 관리자가 배송 상태를 변경할 수 있게 한다.
  async adminChangeDeliveryStatus(orderId, deliveryStatus) {
    try {
      // 일단 해당하는 주문 찾고 주문 상태 변경 후 저장
      const order = await Order.findById(new ObjectId(orderId));
      order.deliveryStatus = deliveryStatus;
      await order.save();
      return {
        status: 200,
        message: "배송 상태 변경에 성공하였습니다.",
      };
    } catch (err) {
      return {
        status: 400,
        errMsg: "배송 상태를 변경할 수 없습니다.",
        err,
      };
    }
  }

  // 관리자가 주문 삭제
  async adminDeleteOrder(orderId) {
    try {
      // 우선 해당 주문을 찾고 배송 상태를 확인
      const order = await Order.findById(new ObjectId(orderId));
      // 해당 주문의 배송 상태가 배송 완료가 아닐 경우에는 삭제 불가
      if (order.deliveryStatus !== "배송 완료") {
        return {
          status: 400,
          errMsg: "배송 완료가 아닌 상품은 삭제할 수 없습니다.",
        };
      }
      // 해당 주문의 배송 상태가 완료가 아닐 경우 삭제
      await Order.findByIdAndDelete(new ObjectId(orderId));
      return {
        status: 200,
        message: "해당 상품 주문 삭제에 성공하였습니다.",
      };
    } catch (err) {
      return {
        status: 400,
        errMsg: "관리자 주문 목록 삭제를 실패했습니다.",
        err,
      };
    }
  }
}

const orderService = new OrderService();

export { orderService };
