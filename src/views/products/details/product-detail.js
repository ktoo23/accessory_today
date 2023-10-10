// 상품 주문 개수 up&down
const numberElement = document.querySelector(".number");
const arrowUp = document.querySelector(".arrow-up");
const arrowDown = document.querySelector(".arrow-down");

let number = 1;

function increaseNumber() {
  number++;
  numberElement.textContent = number;
}

function decreaseNumber() {
  if (number > 1) {
    number--;
    numberElement.textContent = number;
  }
}

arrowUp.addEventListener("click", increaseNumber);
arrowDown.addEventListener("click", decreaseNumber);

// 상품 데이터
const pathSegments = window.location.pathname.split("/");
const productId = pathSegments[pathSegments.length - 1]; // 마지막 세그먼트를 가져옵니다.
let product = {};
console.log("productId:", productId);
fetch(`/api/products/${productId}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Error");
    }
    return response.json();
  })
  .then((product) => {
    console.log(product);
    document.querySelector(".product-name").textContent = product.productName;
    document.querySelector(".product-price").textContent = product.price;
    document.querySelector(".products-img").src = product.productImg;
    document.querySelector(".productsDet-img").src = product.description;
  })
  .catch((error) => {
    console.error("Error", error);
  });

const productSizeSelect = document.getElementById("productSize");

document
  .querySelector(".add-to-cart-button")
  .addEventListener("click", function () {
    // 사용자가 선택한 수량 가져오기
    product.quantity = parseInt(
      document.querySelector(".number").textContent,
      10
    );

    // 사용자가 선택한 사이즈 가져오기
    product.size = productSizeSelect.value;

    // 사용자가 선택하지 않았다면 경고메세지 출력
    if (product.size === "" || product.size === null) {
      alert("Please select a size!");
      return;
    }

    // 로컬 스토리지에서 장바구니 정보를 불러옵니다.
    const cart = JSON.parse(localStorage.getItem("myCart")) || [];

    // 장바구니에 같은 상품이 이미 있는지 확인합니다.
    const existingProduct = cart.find(
      (p) => p._id === product._id && p.size === product.size
    );

    if (existingProduct) {
      // 이미 있으면 수량을 업데이트합니다.
      existingProduct.quantity += product.quantity;
    } else {
      // 없으면 장바구니에 추가합니다.
      cart.push(product);
    }

    // 장바구니 정보를 로컬 스토리지에 저장합니다.
    localStorage.setItem("myCart", JSON.stringify(cart));

    alert("장바구니에 추가되었습니다.");
  });
