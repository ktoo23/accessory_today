let orderCompleteEl = `
  <span id="user-order-num">고객님이 주문하신 주문번호는<br>
  111 입니다.</span>
  <span><br>주문내역 확인은 <a href="../user/orderTracking/orderTracking.html">주문조회</a>에서 가능합니다.
  </span>
  `;

const initorderComplete = () => {
  const targetEl = document.getElementById('orderNum');
  if (targetEl) {
    targetEl.innerHTML = orderCompleteEl;
  } else {
    console.error('targetEl not found');
  }
};

document.querySelector(".toMain-btn").onclick = function () {
  window.location.href = "../public/main.html";
};

initorderComplete();