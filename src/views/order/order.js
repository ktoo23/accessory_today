document.addEventListener("DOMContentLoaded", function () {

  // 쿼리스트링으로 전달된 것이 없으면 장바구니 창에서 상품 주문을 클릭한 것이므로 localstorage order 안에 있는 정보들을 보여 주어야 함.
  const currentQuery = window.location.search;
  if (!currentQuery) {
    showCartProducts();
  }
});


// 장바구니에서 구매하기로 한 상품 주문서에 띄우기
function getCartProducts() {
  const orderProducts = JSON.parse(localStorage.getItem("order"));
  return orderProducts;
}

// 장바구니에서 선택하여 가져온 상품들을 화면에 보여주기
function showCartProducts() {
  const orderList = document.querySelector(".order-list");
  const orderProducts = getCartProducts();
  console.log(orderProducts);
  let totalPrice = 0;
  for (let i = 0; i < orderProducts.length; i++) {
    const newDiv = document.createElement("div");
    newDiv.id = `product${i + 1}`;
    const product = orderProducts[i];
    console.log(product);
    let html = `<div class="row item-info" id='product${i}'>
      <div class="col-1 item-img"><img src="${product.productImg}"></div>
      <div class="col-4 cart-item-option">${product.productName}</div>
      <div class="col-1 item-price">${product.totalPrice / product.count}</div>
      <div class="col-1 cart-item-quantity">${product.count}</div>
      <div class="col-1 delivery-fee">무료</div>
      <div class="col-1 total-price">${product.totalPrice}</div>
    </div>`;
    newDiv.innerHTML = html;
    // 부모 요소의 마지막 자식 요소 가져오기
    const lastChild = orderList.lastChild;
    // 부모 요소의 마지막 자식 요소의 이전 자식 요소 가져오기 (마지막에서 2번째 자식)
    const secondToLastChild = lastChild.previousElementSibling;
    // 추가할 요소를 부모 요소의 마지막에서 2번째 자식으로 삽입
    orderList.insertBefore(newDiv, secondToLastChild);
    totalPrice += product.totalPrice;
  }
  const cartPrice = document.querySelector(".cart-price");
  cartPrice.innerText = `상품 구매금액 ${totalPrice}원 + 배송비 무료 = 합계 ${totalPrice}원`;
}

function submitForm() {
  location.href="/order";
}