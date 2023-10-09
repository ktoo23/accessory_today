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

//장바구니 클릭시
const addToCartButton = document.querySelector(".add-to-cart-button");
addToCartButton.addEventListener("click", function () {
  // API를 호출하여 상품 상세 정보 가져오기
  const productId = window.location.pathname.split("/").pop();
  console.log(`Fetching product with ID: ${productId}`);
  fetch(`/products/${productId}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const product = data.products[0];

      document.querySelector(".product-name").textContent = product.productName;
      document.querySelector(".product-price").textContent =
        product.price.toLocaleString();
      document.querySelector(".product-img").src = product.productImg;

      // 사용자가 선택한 수량 가져오기
      product.quantity = parseInt(
        document.querySelector(".product-quantity-input").value,
        10
      );

      // 로컬 스토리지에서 장바구니 정보를 불러옵니다.
      const cart = JSON.parse(localStorage.getItem("myCart")) || [];

      // 장바구니에 같은 상품이 이미 있는지 확인합니다.
      const existingProduct = cart.find((p) => p._id === product._id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        cart.push(product);
      }

      // 장바구니 정보를 로컬 스토리지에 저장합니다.
      localStorage.setItem("myCart", JSON.stringify(cart));

      alert("장바구니에 추가되었습니다.");
    })
    .catch((error) => {
      console.error("Error fetching product data:", error);
    });
});
