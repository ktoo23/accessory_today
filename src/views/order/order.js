import { findCartItem } from './cart.js';





const initOrderInfo = () => {
  const targetEl = document.getElementById('orderInfo');
  if (targetEl) {
    targetEl.innerHTML = orderInfo;
  } else {
    console.error('targetEl not found');
  }
};

initOrderInfo();