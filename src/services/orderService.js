// 모델을 불러와서 MongoDB와 상호 작용
const Order = require("../db/orderModel");

// 주문 생성 함수
async function createOrder(orderData) {
  try {
    // 주문 생성 로직
    const newOrder = new Order(orderData);
    await newOrder.save();
    return newOrder;
  } catch (error) {
    throw error;
  }
}

// 주문 조회 함수
async function getOrderById(orderId) {
  try {
    const order = await Order.findById(orderId);
    return order;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrder,
  getOrderById,
};
