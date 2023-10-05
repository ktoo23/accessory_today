// 상품 주문 개수 up&down
const numberElement = document.querySelector(".number");
const arrowUp = document.querySelector(".arrow-up");
const arrowDown = document.querySelector(".arrow-down");

let number = 0;

// 화살표를 클릭할 때 숫자를 올리고 내리는 함수를 정의합니다.
function increaseNumber() {
  number++;
  numberElement.textContent = number;
}

function decreaseNumber() {
  if (number > 0) {
    number--;
    numberElement.textContent = number;
  }
}

// 화살표를 클릭할 때 해당 함수를 호출합니다.
arrowUp.addEventListener("click", increaseNumber);
arrowDown.addEventListener("click", decreaseNumber);




    // // 주문하기 버튼 클릭 이벤트 처리
    // const orderButton = document.querySelector('.order-button');
    // orderButton.addEventListener('click', () => {
    //     // 주문 처리 로직 추가
    //     // 예: 주문 폼을 표시하거나 주문 요청을 보내는 코드
    //     // 예: window.location.href = '주문 페이지 URL';
    // });

    // // 장바구니 담기 버튼 클릭 이벤트 처리
    // const addToCartButton = document.querySelector('.add-to-cart-button');
    // addToCartButton.addEventListener('click', () => {
    //     // 장바구니 담기 처리 로직 추가
    //     // 예: 상품을 장바구니에 추가하는 코드
    // });