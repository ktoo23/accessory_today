// 상품 주문 개수 up&down
const numberElement = document.querySelector(".number");
const arrowUp = document.querySelector(".arrow-up");
const arrowDown = document.querySelector(".arrow-down");

let number = 0;

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

arrowUp.addEventListener("click", increaseNumber);
arrowDown.addEventListener("click", decreaseNumber);
