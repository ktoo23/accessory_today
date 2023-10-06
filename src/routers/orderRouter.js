import { Router } from "express";
import { orderService } from "../services/orderService.js";

const orderRouter = Router();

// 주문 구현을 어떻게 해야 할지 잘 모르겠습니다.
// 1. 로그인 된 유저일 경우 사용자의 정보를 가져와 input에 값을 채워놓은 상태로 form을 제공해야 하는데 이때에도 토큰을 받아 검증해야 하나요?
// 2. 주문창에 주문할 상품들을 띄워야 하는데 이 상품들에 대한 정보는 프론트에서 보내주는 건가요? req.body로 받아야 하나요?
// 3. 주문 성공시 주문이 성공했다고 알려주는 창으로 이동해야 하는데, 이것은 리다이렉트로 처리하나요? 리다이렉트를 하면 주문 정보는 어떻게 같이 보내주어야 하나요??


// 주문 창
orderRouter
  .route("/order-sheet")
  // 만약 유저가 회원이라면 기본 정보들은 다 가져와야 한다. (주문 비밀번호 제외) 
  .get(async (req, res) => {
    try {
      
    }
  })
  // 주문서 보내기
  .post((req, res) => {
    const {orderer, orderPassword, address, phone, email}
  });

// 주문 성공 시 띄울 주문 성공 창
orderRouter.get("/order-sheet/success", (req, res) => {

})

// 관리자 주문 관리 목록 (모든 주문들의 정보가 나옴.)
// 관리자 주문 관리 목록에 들어가려면 accesstoken 필요!
orderRouter.get("/setting", async (req, res) => {
  try {
    const allOrdersList = await orderService.allOrdersList();
    return res.json(allOrdersList);
  } catch (err) {
    return res.json(err);
  }
});

// 관리자 주문 삭제
orderRouter.delete("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    const deleteOrderResult = await orderService.adminDeleteOrder(orderId);
    return res.json(deleteOrderResult);
  } catch (err) {
    return res.json(err);
  }
});

// 관리자 배송 상태 관리
orderRouter.patch("/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { deliveryStatus } = req.body;
  try {
    const changeResult = await orderService.adminChangeDeliveryStatus(
      orderId,
      deliveryStatus
    );
    return res.json(changeResult);
  } catch (err) {
    res.json(err);
  }
});
