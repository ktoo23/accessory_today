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
            <div class="row item-info">
              <div class="col-1 item-img">이미지</div>
              <div class="col-4 cart-item-option">상품 정보</div>
              <div class="col-1 item-price">판매가</div>
              <div class="col-1 cart-item-quantity">수량</div>
              <div class="col-1 delivery-fee">배송비</div>
              <div class="col-1 total-price">합계</div>
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
    const targetEl = document.getElementById('orderInfo');
    if (targetEl) {
      targetEl.innerHTML = orderInfoEl;
    } else {
      console.error('targetEl not found');
    }
  };

  initOrderInfo();
});