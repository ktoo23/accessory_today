import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db/models/userModel.js";
import { NonMember } from "../db/models/nonMemberModel.js";
import { Order } from "../db/models/orderModel.js";
import mongoose from "mongoose";

// 로그인 시 토큰 발급을 위한 secret key 생성, 일단은 여기다 적음.나중에 안보이게 해야함!
// secret key는 한 번만 생성되어야 함.(고정)
const SECRET_KEY = "thisissecret";

class UserService {
  // 회원가입 (포스트맨 성공)
  async join(email, password, checkPassword, username, address, phone) {
    // 중복되는 이메일이 존재하는지 검사
    const userExsist = await User.find({ email: email });
    // 중복되는 이메일이 있을 경우 이미 존재하는 사용자라고 알리기
    if (userExsist.length) {
      return {
        status: 400,
        errMsg: "이미 존재하는 이메일입니다. 다른 이메일을 입력해 주세요.",
      };
    }

    // 비밀번호란에 입력된 값과 비밀번호 확인란에 입력된 값이 다르면 비밀번호가 일치하지 않는다고 알려주기
    if (password !== checkPassword) {
      return {
        status: 400,
        errMsg: "비밀번호가 일치하지 않습니다. 다시 입력해 주세요.",
      };
    }

    // 비밀번호 암호화(해싱 5번)
    const hashedPassword = await bcrypt.hash(password, 5);
    // 암호화를 거친 비밀번호를 포함하여 새로운 사용자 정보 객체 생성
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      address,
      phone,
    });
    // db에 저장하기
    await User.create(newUser);
    // 성공 메시지와 새로 가입한 유저 정보 반환
    return {
      status: 200,
      message: "회원 가입을 축하합니다.",
      newUser: newUser,
    };
  }

  // 로그인 (포스트맨 성공)
  async login(inputEmail, inputPassword) {
    // 입력받은 이메일이 DB에 존재하는지를 확인하고, 있으면 그 유저 정보 user에 담기
    const user = await User.findOne({ email: inputEmail });
    // 입력받은 이메일과 일치하는 이메일을 가진 유저가 없다면
    if (!user) {
      return {
        status: 400,
        errMsg: "존재하지 않는 이메일입니다.",
      };
    }

    // 해당 이메일을 가진 유저가 존재하면 그 유저의 비밀번호가 일치하는지 확인
    const isPasswordCorrect = await bcrypt.compare(
      inputPassword,
      user.password
    );
    if (!isPasswordCorrect) {
      return {
        status: 400,
        errMsg: "비밀번호가 일치하지 않습니다.",
      };
    }

    // 비밀번호가 일치하면 jwt 토큰 발급
    const token = await jwt.sign(
      {
        email: user.email,
        isAdmin: user.isAdmin,
      },
      SECRET_KEY,
      {
        expiresIn: "50m",
      }
    );

    // 토큰 발급 중 에러가 발생하면 에러 메세지를 보냄.
    if (!token) {
      return {
        status: 400,
        errMsg: token,
      };
    }

    // 토큰이 정상적으로 발급되면 그 토큰을 응답으로 보냄.
    return {
      status: 200,
      message: `환영합니다 ${user.username}님!😊`,
      accesstoken: token,
    };
  }

  // 일반 회원 마이페이지 (포스트맨 성공)
  async getMyPage(token) {
    // 우선 토큰이 유효한지 확인하기
    const decodingtoken = await jwt.verify(
      token,
      SECRET_KEY,
      (err, decoded) => {
        if (err) return err;
        else return decoded;
      }
    );

    // 토큰이 유효하지 않으면 에러 메세지 보내기
    if (!decodingtoken) {
      return {
        status: 400,
        errMsg: "토큰이 유효하지 않습니다.",
      };
    }

    // 토큰이 유효하면 해당 유저의 정보를 찾기 (토큰에는 유저의 이메일 정보와 관리자인지 여부가 들어 있다.)
    const user = await User.findOne({ email: decodingtoken.email });
    // 해당 유저의 _id를 가지고 Order에서 회원이 주문한 것이 있으면 그 정보 찾기 (populate 사용!!)
    const userOrders = await Order.find({ user }).populate("user");

    // 마이페이지에 처음 접근하면 주문처리 현황만 나오므로 배송 상태만 전달해주면 된다. (ex) {'배송중': 1, '배송 완료': 2})
    const deliveries = {};
    for (let order of userOrders) {
      if (deliveries[order.deliveryStatus])
        deliveries[order.deliveryStatus] += 1;
      else deliveries[order.deliveryStatus] = 1;
    }

    // 마이페이지에서 사용하기 위해 유저의 정보를 결과로 전달하기
    return {
      status: 200,
      message: `안녕하세요, ${user.username}님!😀 마이페이지 입니다.`,
      user: user,
      deliveryStatus: deliveries,
    };
  }

  // 비회원 마이페이지 주문번호, 비밀번호 검증하기 (해야 함...)
  async postNonMember(name, orderId, orderPassword) {
    // 이름을 먼저 조회 (orders의 값으로 주문 정보가 들어갈 수 있게 populate 했다., find는 배열 반환)
    const nameSame = await NonMember.find({ username: name }).populate(
      "orders"
    );
    // 해당 이름의 비회원이 없으면 없다고 메시지 전달
    if (!nameSame) {
      return {
        status: 400,
        errMsg: "주문자가 존재하지 않습니다. 이름을 다시 확인해 주세요.",
      };
    }

    // 이름이 일치하는 data들(nonMember) 중에서 orderId가 일치하는 data를 찾는다. ($elemMatch 연산자 사용, findOne은 단일 객체 반환)
    const orderIdSame = await nameSame.findOne({
      orders: {
        $elemMatch: {
          _id: orderId,
        },
      },
    });
    // 주문 번호와 일치하는 정보를 찾지 못하면 주문이 존재하지 않는다는 메시지 전달
    if (!orderIdSame) {
      return {
        status: 400,
        errMsg: "주문 내역을 찾지 못했습니다. 주문번호를 다시 확인해 주세요.",
      };
    }

    // 주문번호가 존재하는 경우 거기에 해당하는 member 중 orderPassword가 DB에 저장된 password와 일치하는지 확인
    // Order에서 orderPassword 값은 해싱되어 저장되어 있을 것이기 때문에 bcrypt 사용!
    const isOrderPasswordSame = await bcrypt.compare(
      orderPassword,
      orderIdSame.nonMemberPassword
    );

    // 비밀번호가 일치하지 않으면 주문 비밀번호가 일치하지 않는다는 알림을 보낸다.
    if (!isOrderPasswordSame) {
      return {
        status: 400,
        errMsg: "주문 비밀번호가 일치하지 않습니다.",
      };
    }

    // 다 일치하는 경우 비회원 페이지 접속 가능하고, 비회원 정보도 전달된다.
    // 그 전에 orders에서 비회원이 주문한 것들만 걸러낸다.
    const nonMemberOrders = await orderIdSame.orders(
      (order) => order.orderEmail
    );

    return {
      status: 200,
      message: `비회원 ${orderIdSame.username}님의 주문조회 페이지입니다.`,
      nonMember: nonMemberData,
    };
  }

  // 비회원 페이지 (비회원 주문조회 페이지)
  getNonMemberPage() {
    return "nonmember order";
  }
}

const userService = new UserService();

export { userService };
