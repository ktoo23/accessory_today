const express = require("express");
const router = express.Router();
const orderService = require("../services/orderService");

// 주문 생성 엔드포인트
router.post("/order", async (req, res) => {
  try {
    const orderData = req.body; // 클라이언트에서 주문 데이터를 받아옴
    const newOrder = await orderService.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "주문 생성에 실패했습니다." });
  }
});

// 주문 조회 엔드포인트
router.get("/order/:orderId", async (req, res) => {
  try {
    const orderId = req.params.orderId;
    const order = await orderService.getOrderById(orderId);
    if (!order) {
      return res.status(404).json({ error: "주문을 찾을 수 없습니다." });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "주문 조회에 실패했습니다." });
  }
});

module.exports = router;
