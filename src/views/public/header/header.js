let headerEl = `
<header>
  <div class="container"> 
    <div class="row">
      <div class="logo">
        <a href="/"><img src="${logoImagePath()}" alt="logo" id="logo"/></a>
      </div>
    </div>
  </div>
</div>
</div>
  <div class="header-gap row align-items-center justify-content-between">
    <div class="col">
      <div class="search">
        <form action="/search" method="GET">
          <input type="text" id="search" name="q" placeholder="SEARCH">
          <button type="submit" class="search-btn"><i class="bi bi-search"></i></button>
        </form>
      </div>
    </div>
    <div class="col">
      <ul class="header-middle">
        <li><a href="/products" data-page="products">SHOP</a></li>
        <li><a href="/#newTitle" data-page="newItem">신상품</a></li>
        <li><a href="/#bestTitle" data-page="bestItem">Best</a></li>
        <li><a href="/about" data-page="about">About</a></li>
      </ul>
    </div>
    <div class="col">
      <ul class="header-right">
        <li><a href="/login" data-page="login">LOGIN</a></li>
        <li><a href="/join" data-page="join">JOIN</a></li>
        <li><a href="/mypage" data-page="mypage">MYPAGE</a></li>
        <li><a href="" class="order-tracking">주문조회</a></li>
        <li class="count">
          <a href="/cart" data-page="cart">
            <i class="bi bi-basket3-fill"></i>
            <span class="count" id="cart-count"></span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</header>
`;

const initHeader = () => {
  const targetEl = document.getElementById("header");
  if (targetEl) {
    targetEl.innerHTML = headerEl;
  } else {
    console.error("targetEl not found");
  }
};

function logoImagePath() {
  const imagePaths = {
    main: "/public/img/today-logo.png",
    other: "/public/img/today-logo.png",
  };
  const currentPath = window.location.pathname.replace(/\/$/, "");
  if (currentPath === "/") {
    return imagePaths.main;
  } else {
    return imagePaths.other;
  }
}

initHeader();
logoImagePath();

// 로컬스토리지 Authorization 항목이 있다면 (토큰이 있으면) Login이 아니라 Logout이 되어야 한다.
const link = document.querySelector(".header-right li:first-child a");
if (localStorage.getItem("Authorization")) {
  link.innerText = "LOGOUT";
  link.href = "/";
} else {
  link.innerText = "LOGIN";
  link.href = "/login";
}

// 로그아웃 (만약 클릭한 글자가 LOGOUT일 때, localstorage에 있는 Authorizaion 항목 삭제)
const logout = document.querySelector(".header-right li:first-child a");
logout.addEventListener("click", (e) => {
  if (logout.innerText === "LOGOUT") {
    localStorage.removeItem("Authorization");
    // 삭제하고 다시 연결하면 LOGIN이라고 뜸.
    window.location.href = "/";
  }
});

// 페이지 로드 시 혹은 상품이 장바구니에 추가될 때마다 호출되어야 하는 함수입니다.
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("myCart")) || [];
  let count = 0;
  cart.forEach((item) => {
    count += Number(item.quantity) || 0;
  });
  document.getElementById("cart-count").textContent = count;
}

window.onload = updateCartCount;
window.addEventListener("storage", updateCartCount);


// 주문조회 페이지로 이동
const userToken = localStorage.getItem("Authorization") || "";
document.querySelector('.order-tracking').addEventListener('click', (e) => {
  e.preventDefault();

  console.log('Order tracking link clicked')
  console.log('Token:', userToken);
  if (!userToken) {
    window.location.href = "/login";
  } else movetToOrderTracking();
});

async function movetToOrderTracking() {
  await fetch("/api/users/mypage", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      userId = data.user["_id"];
      console.log(userId);
      window.location.href = `/user/orderTracking/${userId}`;
    })
}
