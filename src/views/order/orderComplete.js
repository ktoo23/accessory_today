let orderCompleteEl = `
  <p>고객님이 주문하신 주문번호는<p>
  <span id="user-order-num"">111</span>입니다.
  <p><br>주문내역 확인은 <a href="/user/orderTracking/orderTracking.html">주문조회</a>에서 가능합니다.
  </p>
  `;

getOrderNumber();

async function getOrderNumber() {
  // /api/users/non-member-page?orderId=${orderId}
  await fetch(`/api/users/mypage/order-tracking?userId=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log(res.status);
      if (res.status === 400) {
        $orderDiv.style.display = "none";
        $noOrderProduct.style.display = "block";
      }
      return res.json();
    })
    .then((orderData) => {
      if (orderData.status === 200) {
        $orderDiv.style.display = "block";
        $noOrderProduct.style.display = "none";

        orderData.forEach(data => {
          let orderId = data["_id"];
          let deliveryStatus = data.deliveryStatus;
          let orderProducts = data.orderProducts;
          let isCanceled = data.isCanceled;
          addProduct(orderId, orderProducts, deliveryStatus, isCanceled);
        });
      }
    })
    .catch((err) => console.log(err));
}

const initorderComplete = () => {
  const targetEl = document.getElementById('orderNum');
  if (targetEl) {
    targetEl.innerHTML = orderCompleteEl;
  } else {
    console.error('targetEl not found');
  }
};

document.querySelector(".toMain-btn").onclick = function () {
  window.location.href = "/";
};

initorderComplete();
