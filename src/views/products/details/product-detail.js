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

// 상품 데이터 불러오기
const pathSegments = window.location.pathname.split("/");
const productId = pathSegments[pathSegments.length - 1]; // 마지막 세그먼트를 가져옵니다.
let product = {};
console.log("productId:", productId);
const productSizeSelect = document.getElementById("product-size");
const selectedSizeText =
  productSizeSelect.options[productSizeSelect.selectedIndex].innerText;
fetch(`/api/products/${productId}`)
  .then((response) => {
    console.log(response);
    if (!response.ok) {
      throw new Error("Error");
    }
    return response.json();
  })
  .then((productData) => {
    console.log(productData);
    document.querySelector(".product-name").textContent =
      productData.productName;
    document.querySelector(".product-price").textContent = productData.price;
    document.querySelector(".products-img").src = productData.productImg;
    document.querySelector(".productsDet-img").src = productData.description;

    product = {
      productId: productData._id,
      productName: productData.productName,
      price: productData.price,
      productImg: productData.productImg,
      size: selectedSizeText,
      quantity: 1,
    };
  })
  .catch((error) => {
    console.error("Error", error);
  });

document
  .querySelector(".add-to-cart-button")
  .addEventListener("click", function () {
    product.quantity = parseInt(
      document.querySelector(".number").textContent,
      10
    );

    product.size = productSizeSelect.value;

    if (product.size === "" || product.size === null) {
      alert("상품 사이즈를 선택해주세요.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("myCart")) || [];

    // 장바구니에 같은 상품이 이미 있는지 확인합니다.
    const existingProduct = cart.find(
      (p) => p._id === product._id && p.size === product.size
    );

    if (existingProduct) {
      // 이미 있으면 수량을 업데이트합니다.
      existingProduct.quantity += product.quantity;
    } else {
      cart.push(product);
    }
    localStorage.setItem("myCart", JSON.stringify(cart));

    alert("장바구니에 추가되었습니다.");
    console.log("Added product:", product);
    console.log("Current cart:", JSON.parse(localStorage.getItem("myCart")));
  });

async function verifyToken(token) {
  return await fetch("/api/users/verify-user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      console.log("Network error during token verification:", error);
      return false;
    });
}

function createCartUrl({ productImg, productName, price, quantity, size }) {
  return `/cart?productId=${productId}&productImg=${productImg}&productName=${productName}&price=${price}&quantity=${quantity}&size=${size}`;
}

//BUYNOW 버튼 클릭 시
document.querySelector(".order-button").addEventListener("click", function () {
  // const { productImg, productName, price, quantity, size } = product;
  const productName = document.querySelector(".product-name").innerText;
  const price = document.querySelector(".product-price").innerText;
  const productImg = document
    .querySelector(".products-img")
    .getAttribute("src");
  const size = document.querySelector("#product-size").value;
  const quantity = document.querySelector(".number").innerText;

  const product = {
    productId,
    productName,
    price,
    productImg,
    size,
    quantity,
  };

  if (product.size === "" || product.size === null) {
    alert("상품 사이즈를 선택해주세요.");
    return;
  }

  console.log(product);

  const token = localStorage.getItem("Authorization") || "";

  // function createProductInfoQueryString(product) {
  //   return Object.keys(product)
  //     .map((key) => `${key}=${encodeURIComponent(product[key])}`)
  //     .join("&");
  // }
  if (!token) {
    // 비회원일 때 로컬스토리지에 상품 정보 저장
    localStorage.setItem("nonmember-buynow", JSON.stringify(product));
    // cart.push(product);
    // console.log(product);
    // localStorage.setItem("myCart", JSON.stringify(cart));

    // const productInfo = createProductInfoQueryString(product);
    // console.log("productInfo:", productInfo);
    window.location.href = `/order`;
    return;
  }

  // 토큰이 있을 경우(로그인 상태)
  verifyToken(token).then((isValid) => {
    if (isValid) {
      window.location.href = createCartUrl({
        productId,
        productImg,
        productName,
        price,
        quantity,
        size,
      });
    } else {
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      window.location.href = "/login";
    }
  });
});

// 후기,문의 버튼 클릭 시 로그인 토큰 검사
document.getElementById("reviews-btn").addEventListener("click", function () {
  verifyTokenAndRedirect(
    // 경로 수정!
    `/products/details/${productId}/review-upload`
  );
});

document.getElementById("questions-btn").addEventListener("click", function () {
  verifyTokenAndRedirect(
    // 경로 수정!
    `/products/details/${productId}/inquiry-upload`
  );
});

function verifyTokenAndRedirect(url) {
  const token = localStorage.getItem("Authorization") || "";
  if (!token) {
    alert("로그인이 필요합니다.");
    window.location.href = "/login";
    return;
  }

  verifyToken(token).then((data) => {
    if (!data.email) {
      alert("유효하지 않은 회원입니다. 다시 로그인해주세요.");
      window.location.href = "/login";
    } else {
      window.location.href = url;
    }
  });
}

//날짜데이터 수정
function formatDate(dateStr) {
  const date = new Date(dateStr);
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getUTCDate()).padStart(2, "0")}`;
}

//후기,문의작성 title,author,content
function fetchReviews(productId) {
  fetch(`/api/products/${productId}/review`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("error" + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const tableBody = document.querySelector("#review-table tbody");
      // 데이터를 테이블로 출력
      data.forEach((review) => {
        if (review.productId === productId) {
          // productId 확인
          const row = document.createElement("tr");

          const dateCell = document.createElement("td");
          dateCell.textContent = formatDate(review.date);
          row.appendChild(dateCell);

          const authorCell = document.createElement("td");
          authorCell.textContent = review.author;
          row.appendChild(authorCell);

          const titleCell = document.createElement("td");
          titleCell.textContent = review.title;
          row.appendChild(titleCell);

          const contentCell = document.createElement("td");
          contentCell.textContent = review.content;
          row.appendChild(contentCell);

          tableBody.appendChild(row);
        }
      });
    })
    .catch((err) => console.error("Error", err));
}

function fetchQuestion(productId) {
  fetch(`/api/products/${productId}/inquiry`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("error " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const tableBody = document.querySelector("#question-table tbody");
      // 데이터를 테이블로 출력
      data.forEach((question) => {
        if (question.productId === productId) {
          // productId 확인
          const row = document.createElement("tr");

          const dateCell = document.createElement("td");
          dateCell.textContent = formatDate(question.date);
          row.appendChild(dateCell);

          const authorCell = document.createElement("td");
          authorCell.textContent = question.author;
          row.appendChild(authorCell);

          const titleCell = document.createElement("td");
          titleCell.textContent = question.title;
          row.appendChild(titleCell);

          const contentCell = document.createElement("td");
          contentCell.textContent = question.content;
          row.appendChild(contentCell);

          tableBody.appendChild(row);
        }
      });
    })
    .catch((err) => console.error("Error", err));
}
window.onload = function () {
  fetchReviews(productId);
  fetchQuestion(productId);
};

// 이 코드는 디테일 페이지에서 상품 카테고리 클릭 시 상품 화면이 올바르게 나오게 하기 위한 코드입니다.
const categories = document.querySelectorAll("#categorySelect li");

for (let category of categories) {
  category.addEventListener("click", (e) => {
    e.preventDefault();

    const selected = e.target.getAttribute("data-category");

    // ALL을 선택 시
    if (selected === "") {
      window.location.href = "/products";
    } else {
      // ALL이 아닌 다른 카테고리 선택 시
      window.location.href = `/products?category=${selected}`;
    }
  });
}
