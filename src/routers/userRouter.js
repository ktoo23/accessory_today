import { Router } from "express";
import { userService } from "../services/userService.js";

const userRouter = Router();

userRouter.get("/verify-user", async (req, res) => {
  const accessToken = req.header("Authorization").split("Bearer ")[1] || null;
  console.log(accessToken);
  try {
    const verifyResult = await userService.verifyToken(accessToken);
    return res.status(200).json(verifyResult);
  } catch (err) {
    return res.status(400).json(verifyResult);
  }
});

// 회원가입 (포스트맨 성공)
userRouter.post("/join", async (req, res) => {
  // 요청으로 들어온 내용들 구조 분해 할당
  const { email, password, checkPassword, username, address, phone } = req.body;
  try {
    // 회원가입 요청 처리 결과를 받음. (상태 코드 200이면 성공)
    const joinResult = await userService.join(
      email,
      password,
      checkPassword,
      username,
      address,
      phone
    );
    console.log(joinResult);
    if (joinResult.status === 200) {
      return res.status(200).json(joinResult);
    } else {
      return res.status(400).json(joinResult);
    }
  } catch (err) {
    return res.status(500).json({ errMsg: err.message });
  }
});

// 회원 로그인 (포스트맨 성공)
userRouter.post("/member-login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const loginResult = await userService.login(email, password);
    console.log(loginResult);
    if (loginResult.status === 200) {
      return res.status(200).json(loginResult);
    } else {
      return res.status(400).json(loginResult);
    }
    // 로그인에 성공하면 HOME으로 연결된다.
    // return res.redirect("/");
  } catch (err) {
    return res.status(500).json({ errMsg: err.message });
  }
});

// 회원 마이페이지 (포스트맨 성공)
userRouter.route("/mypage").get(async (req, res) => {
  const accessToken = req.header("Authorization").split("Bearer ")[1];
  try {
    const getMyPageResult = await userService.getMyPage(accessToken);
    console.log(getMyPageResult);
    if (getMyPageResult.status === 200) {
      return res.status(200).json(getMyPageResult);
    } else {
      return res.status(400).json(getMyPageResult);
    }
  } catch (err) {
    return res.status(500).json({ errMsg: err.message });
  }
});

// 회원 주문조회 페이지 (포스트맨 성공)
userRouter
  .route("/mypage/order-tracking")
  // 회원 주문 조회 페이지에 띄울 정보 가져오기
  .get(async (req, res) => {
    // 회원 주문조회 페이지는 무조건 마이페이지(배송 현황페이지)를 거쳐서 들어갈 수 있음.(마이페이지에서의 메뉴이므로)
    // 그래서 /mypage로의 요청의 결과로 받은 user 정보에서 user의 _id를 qureystring으로 하여 백엔드로 요청을 보내면 백엔드는 그 요청을 받아
    // 해당 querystring에 있는 userId로 user의 주문 정보를 찾기 (/mypage/order-tracking?userId=${user._id})
    const { userId } = req.query;
    try {
      const getOrderInfoResult = await userService.getUserOrders(userId);
      if (getOrderInfoResult.status === 200) {
        return res.status(200).json(getOrderInfoResult);
      } else {
        return res.status(400).json(getOrderInfoResult);
      }
    } catch (err) {
      return res.status(500).json({ errMsg: err.message });
    }
  })
  // 회원 주문 취소 (주문 조회 페이지에서 이루어짐.) => postman 테스트 성공
  .delete(async (req, res) => {
    const { orderId } = req.query;
    try {
      const cancelOrderResult = await userService.cancelOrder(orderId);
      console.log(cancelOrderResult);
      // 삭제에 성공하면 다시 회원 주문조회 페이지로 리다이렉트 (주문 삭제 결과 반영)
      if (cancelOrderResult.status === 200) {
        return res.status(200).json(cancelOrderResult);
        // return res.redirect("/mypage/order-tracking");
      } else {
        // 배송 준비중 단계 이상의 상품이거나 어떤 이유로 삭제가 안된다면 그 메시지 보내기
        return res.status(400).json(cancelOrderResult);
      }
    } catch (err) {
      return res.status(500).json({ errMsg: err.message });
    }
  });

// 회원 정보 변경 (회원만 가능!) => get, patch, delete 셋 다 postman 성공!
// 회원 정보 변경 페이지는 무조건 마이페이지(배송 현황페이지)를 거쳐서 들어갈 수 있음.(마이페이지에서의 메뉴이므로)
// 그래서 /mypage로의 요청의 결과로 받은 user 정보에서 user의 _id를 qureystring으로 하여 백엔드로 요청을 보내면 백엔드는 그 요청을 받아
// 해당 querystring에 있는 userId로 user 정보를 찾기 (/mypage/userinfo?userId=${user._id}) => 주문 조회 때랑 유사
userRouter
  .route("/mypage/userinfo-edit")
  // form에 User에 저장된 회원 정보의 값들을 띄우기 위해 가져와야 함.
  // 비밀번호는 새로 작성해야 하므로 비밀번호 값은 가져올 필요 X
  .get(async (req, res) => {
    const { userId } = req.query;
    try {
      const getUserInfoResult = await userService.getUserInfo(userId);
      if (getUserInfoResult.status === 200) {
        return res.status(200).json(getUserInfoResult);
      } else {
        return res.status(400).json(getUserInfoResult);
      }
    } catch (err) {
      return res.status(500).json({ errMsg: err.message });
    }
  })
  // 사용자가 정보 수정 후 form을 제출하면 그 정보가 반영됨.
  .patch(async (req, res) => {
    try {
      const { userId } = req.query;
      const { password, checkPassword, username, address, phone } = req.body;
      const updateInfoResult = await userService.updateUserInfo(
        userId,
        password,
        checkPassword,
        username,
        address,
        phone
      );
      console.log(updateInfoResult);
      if (updateInfoResult.status === 200) {
        return res.status(200).json(updateInfoResult);
      } else {
        return res.status(400).json(updateInfoResult);
      }
    } catch (err) {
      return res.status(500).json({ errMsg: err.message });
    }
  })
  // 회원 탈퇴 (정보 수정하기 버튼 옆에 있음.)
  .delete(async (req, res) => {
    try {
      const { userId } = req.query;
      const deleteUser = await userService.deleteUser(userId);
      console.log(deleteUser);
      if (deleteUser.status === 200) {
        return res.status(200).json(deleteUser);
      } else {
        return res.status(400).json(err);
      }
    } catch (err) {
      return res.status(500).json({ errMsg: err.message });
    }
  });

// 비회원 주문 검증 (비회원 로그인)
userRouter.post("/non-member-login", async (req, res) => {
  const { orderer, orderId, orderPassword } = req.body;
  try {
    const accessNonMemberPageResult = await userService.postNonMember(
      orderer,
      orderId,
      orderPassword
    );
    console.log(accessNonMemberPageResult);
    // 성공 시 비회원 주문조회 페이지로 이동 (accessNonMemberPageResult에서 status와 message, nonMemberOrder 정보를 객체로 반환해 주는데, 이것에서 주문 id를 queryString으로 사용)
    if (accessNonMemberPageResult.status === 200) {
      return res.status(200).json(accessNonMemberPageResult);
      // 성공하면 바로 비회원 주문 페이지로 redirect
      // return res.redirect(
      //   `/non-member-page?orderId=${accessNonMemberPageResult.nonMemberOrder._id}`
      // );
    } else {
      return res.status(400).json(accessNonMemberPageResult);
    }
  } catch (err) {
    res.status(500).json({ errMsg: err.message });
  }
});

// 비회원 페이지(비회원 주문조회 페이지) 정보 불러오기 및 주문 취소 처리하기 (아까 위에서 비회원 주문 검증을 통과해야 가능)
// 비회원 페이지는 회원 마이페이지와 다르게 들어가자마자 배송 현황과 주문한 상품 목록이 한 화면에 다 나옴.
userRouter
  // 비회원 페이지 정보 불러오기 (users/non-member-page?orderId=${orderId} 형식으로 요청 보내기)
  .get("/non-member-page", async (req, res) => {
    const { orderId } = req.query;
    try {
      const getNonMemberPageResult = await userService.getNonMemberPage(
        orderId
      );
      if (getNonMemberPageResult.status === 200) {
        return res.status(200).json(getNonMemberPageResult);
      } else {
        return res.status(400).json(getNonMemberPageResult);
      }
    } catch (err) {
      return res.status(500).json({ errMsg: err.message });
    }
  });
// 비회원 페이지 주문 취소 처리하기
userRouter.delete("/non-member-page", async (req, res) => {
  const { orderId } = req.query;
  try {
    const cancelOrderResult = await userService.cancelOrder(orderId);
    // 삭제에 성공하면 삭제 성공을 알리고 홈페이지로 리다이렉트 (주문 삭제 결과 반영)
    // 다시 비회원 주문에 접근하려고 정보를 입력하고 제출하면 주문 번호가 존재하지 않아 접근 불가
    if (cancelOrderResult.status === 200) {
      return res.status(200).json(cancelOrderResult);
      // return res.redirect("/");
    } else {
      // 배송 준비중 단계 이상의 상품이거나 어떤 이유로 삭제가 안된다면 그 메시지 보내기
      return res.status(400).json(cancelOrderResult);
    }
  } catch (err) {
    return res.status(500).json({ errMsg: err.message });
  }
});

export { userRouter };
