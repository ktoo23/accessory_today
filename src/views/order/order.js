document.addEventListener("DOMContentLoaded", function () {
  let orderInfoEl = `
  <div class="order-container">
        <div class="cart-contents">
          <div class="row page-title">
            <h2>주문서 작성</h2>
          </div>
          <div class="row order-list">
            <div class="row cart-title">
              <div class="col-1 ">이미지</div>
              <div class="col-4">상품 정보</div>
              <div class="col-1">판매가</div>
              <div class="col-1">수량</div>
              <div class="col-1">배송비</div>
              <div class="col-1">합계</div>
            </div>
            <div class="row cart-price">상품 구매금액 + 배송비 무료 = 합계 원</div>
          </div>
        <div>
          <form id="order-form" method="post">
            <span>배송 정보</span>
            <div>
                <label for="receiver_name">받으시는 분*</label>
                <input type="text" class="form-control" id="receiver-name" name="receiver-name" required>
            </div>
            <div>
                <label for="order-password">주문조회 비밀번호*</label>
                <input type="password" class="form-control" id="order-password" name="order-password" placeholder="영문 대소문자/숫자 조합, 8~16자">
              </div>
            <div>
                <label for="confirm-password">주문조회 비밀번호 확인*</label>
                <input type="password" class="form-control" id="confirm-password" name="confirm-password" required>
            </div>
            <div>
                <label for="receiver-address">주소*</label>
                <input type="text" class="form-control" id="receiver-address" name="receiver-address">
            </div>
            <div class="phone">
                <label for="phone-number">휴대전화*</label>
                <div class="phone-inputs">
                <input type="tel" class="form-control" id="phone1" name="phone1" maxlength="3" size="3" required> -
                <input type="tel" class="form-control" id="phone2" name="phone2" maxlength="4" size="4" required> -
                <input type="tel" class="form-control" id="phone3" name="phone3" maxlength="4" size="4" required>
                </div>
            </div>
            <div>
                <label for="email">이메일*</label>
                <input type="email" class="form-control" id="email" name="email" required>
            </div>
            <div class="form-submit-container">
                <button type="submit" class="form-submit-btn" value="order complete">주문 완료하기</button>
            </div>
            </div>
        </form>
        </div>
      </div>

  `;

  const initOrderInfo = () => {
    const targetEl = document.getElementById("orderInfo");
    if (targetEl) {
      targetEl.innerHTML = orderInfoEl;
    } else {
      console.error("targetEl not found");
    }
  };

  initOrderInfo();

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
