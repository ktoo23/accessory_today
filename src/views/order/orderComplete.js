document.addEventListener("DOMContentLoaded", function () {
  const userOrderNumber = localStorage.getItem('userOrderNumber');
  if (userOrderNumber) {
    document.getElementById('user-order-num').textContent = userOrderNumber;
  }
});

const token = localStorage.getItem("Authorization") || "null";

document.querySelector(".order-search-btn").addEventListener("click", function () {
  if (token === "null") { //비회원 주문
    window.location.href = `/non-member/order-tracking/${userOrderNumber}`;
  } else { // 회원 주문
    window.location.href = `/user/orderTracking/${userOrderNumber}`;
  }
});

document.querySelector(".toMain-btn").addEventListener("click", function () {
  window.location.href = "/";
});