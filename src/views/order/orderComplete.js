document.addEventListener("DOMContentLoaded", function () {
  // const userOrderNumber = localStorage.getItem('userOrderNumber');
  // if (userOrderNumber) {
  //   document.getElementById('user-order-num').textContent = userOrderNumber;
  // }
  const currentUrl = window.location.href.split("/");
  let orderId = "";
  if (currentUrl.length === 6) {
    orderId = currentUrl[currentUrl.length - 2];
  } else {
    orderId = currentUrl[currentUrl.length - 1];
  }
  // console.log(orderId);
  document.getElementById("user-order-num").textContent = orderId;
});

const token = localStorage.getItem("Authorization") || null;

document
  .querySelector(".order-search-btn")
  .addEventListener("click", function (e) {
    e.preventDefault();
    if (token === null) {
      //비회원 주문
      const currentUrl = window.location.href.split("/");
      const orderId = currentUrl[currentUrl.length - 1];
      console.log(orderId);
      alert("비회원 주문조회 창으로 이동합니다.");
      window.location.href = `/non-member/order-tracking/${orderId}`;
    } else {
      // 회원 주문
      const currentUrl = window.location.href.split("/");
      const userId = currentUrl[currentUrl.length - 1];
      alert("마이페이지 주문조회 창으로 이동합니다.");
      window.location.href = `/user/orderTracking/${userId}`;
    }
  });

document.querySelector(".toMain-btn").addEventListener("click", function () {
  window.location.href = "/";
});
