import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Order } from "../db/models/orderModel.js";
import { NonMember } from "../db/models/nonMemberModel.js";
import mongoose from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

class orderService {
  // 사용자 주문 구현해야 함.

  // 관리자 주문 관리 목록 => 모든 주목 목록을 가져옴
  async getallOrdersList() {
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
          status: 200,
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

  // 관리자가 주문 삭제
  async adminDeleteOrder(orderId) {
    try {
      // 우선 해당 주문을 찾고 배송 상태를 확인
      const order = Order.findById(new ObjectId(orderId));
      // 해당 주문의 배송 상태가 배송 완료가 아닐 경우에는 삭제 불가
      if (order.deliveryStatus !== "배송 완료") {
        return {
          status: 400,
          errMsg: "배송 완료가 아닌 상품은 삭제할 수 없습니다.",
        };
      }
      // 해당 주문의 배송 상태가 완료가 아닐 경우 삭제
      const deleteOrder = await Order.findByIdAndDelete(new ObjectId(orderId));
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
}

const orderSettingService = new orderService();

export { orderService };
