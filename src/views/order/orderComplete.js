let orderCompleteEl = `
  <p>고객님이 주문하신 주문번호는
  111 입니다.

  주문내역 확인은 <a href="../user/orderTracking/orderTracking.html">주문조회</a>애서 가능합니다.
  </p>
  `;

const initorderComplete = () => {
  const targetEl = document.getElementById('orderNum');
  if (targetEl) {
    targetEl.innerHTML = orderCompleteEl;
  } else {
    console.error('targetEl not found');
  }
};

document.getElementById("toMain-btn").onclick = function () {
  window.location.href = "../public/main.html";
};

initorderComplete();