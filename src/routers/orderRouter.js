import { Router } from "express";
import { orderService } from "../services/orderService.js";
import { Order } from "../db/models/orderModel.js";

const orderRouter = Router();

// 주문 구현을 어떻게 해야 할지 잘 모르겠습니다.
// 1. 로그인 된 유저일 경우 사용자의 정보를 가져와 input에 값을 채워놓은 상태로 form을 제공해야 하는데 이때에도 토큰을 받아 검증해야 하나요?
// 2. 주문창에 주문할 상품들을 띄워야 하는데 이 상품들에 대한 정보는 프론트에서 보내주는 건가요? req.body로 받아야 하나요?
// 3. 주문 성공시 주문이 성공했다고 알려주는 창으로 이동해야 하는데, 이것은 리다이렉트로 처리하나요? 리다이렉트를 하면 주문 정보는 어떻게 같이 보내주어야 하나요??

// 주문 구현 우선은 모두 성공 ...! 테스트도 모두 성공!

// 주문 창
orderRouter
  .route("/order-sheet")
  .get(async (req, res) => {
    // 우선은 로그인이 되어 있는지 아닌지를 구분해야 한다. 따라서 클라이언트가 보낸 토큰을 보고 token 값이 있는지 없는지를 확인하고
    // 값이 있으면 해독하여 회원의 기본 정보를 보내고, 없으면 비회원으로 취급한다.
    const accessToken = req.header("Authorization").split("Bearer ")[1] || null;
    try {
      const getUserInfoResult = await orderService.getUserInfo(accessToken);
      if (getUserInfoResult.status === 200) {
        return res.status(200).json(getUserInfoResult);
      } else {
        return res.status(400).json(getUserInfoResult);
      }
    } catch (err) {
      return res.status(500).json({ errMsg: err });
    }
  })
  // 주문서 보내기
  .post(async (req, res) => {
    // 회원의 경우 email 란은 수정 불가, password 칸은 작성 불가
    const {
      orderer,
      orderPassword,
      checkPassword,
      orderAddress,
      orderPhone,
      email,
      products,
      totalPrice,
      paidThrough,
    } = req.body;
    console.log(products);
    try {
      const postOrderSheetResult = await orderService.postOrderSheet(
        orderer,
        orderPassword,
        checkPassword,
        orderAddress,
        orderPhone,
        email,
        products,
        totalPrice,
        paidThrough
      );
      if (postOrderSheetResult.status === 200) {
        return (
          res
            .status(200)
            // 주문서 내보내기에 성공하면 주문 번호(id)가 결과로 반환됨
            .json(postOrderSheetResult)
        );
      } else {
        return res.status(400).json(postOrderSheetResult);
      }
    } catch (err) {
      return res.status(500).json({ errMsg: err });
    }
  });

// 주문 성공 시 띄울 주문 성공 창 (쿼리스트링으로 주문번호 받기)
// 보류
// orderRouter.get("/order-success", async (req, res) => {
//   const { orderId } = req.query;
//   try {
//     return res.status(200).json({
//       orderId,
//     });
//   } catch (err) {
//     return res.status(500).json({
//       errMsg: err,
//     });
//   }
// });

// 관리자 주문 관리 목록 (모든 주문들의 정보가 나옴.) => 포스트맨 성공!
orderRouter.get("/setting", async (req, res) => {
  try {
    const allOrdersList = await orderService.getAllOrdersList();
    if (allOrdersList) {
      return res.status(200).json(allOrdersList);
    } else {
      return res.status(400).json(allOrdersList);
    }
  } catch (err) {
    return res.status(500).json({ errMsg: err });
  }
});

// 관리자 배송 상태 관리 => 포스트맨 성공!
orderRouter.patch("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { deliveryStatus } = req.body;
  try {
    const changeResult = await orderService.adminChangeDeliveryStatus(
      orderId,
      deliveryStatus
    );
    if (changeResult.status === 200) {
      return res.status(200).json(changeResult);
    } else {
      return res.status(400).json(changeResult);
    }
  } catch (err) {
    return res.status(500).json({ errMsg: err });
  }
});

// 관리자 주문 삭제 => 포스트맨 성공!
orderRouter.delete("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    const deleteOrderResult = await orderService.adminDeleteOrder(orderId);
    if (deleteOrderResult.status === 200) {
      return res.status(200).json(deleteOrderResult);
    } else {
      return res.status(400).json(deleteOrderResult);
    }
  } catch (err) {
    return res.status(500).json({ errMsg: err });
  }
});

export { orderRouter };
