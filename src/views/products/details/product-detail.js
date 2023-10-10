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

// 상품 데이터
const productId = "6523ab70a7ebddef6d97827e";
console.log("Extracted productId:", productId);
fetch(`/api/products/${productId}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    return response.json();
  })
  .then((product) => {
    // 이곳에서 product를 사용합니다.
    console.log(product);
    document.querySelector(".product-name").textContent = product.productName;
    document.querySelector(".product-price").textContent = product.price;
    document.querySelector(".productDet-image").src = product.productImg;
  })
  .catch((error) => {
    console.error("Error fetching product data:", error);
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
