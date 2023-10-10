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
        <li class="/mypage/order-tracking/:orderId" data-page="order-search"><a href="#">주문조회</a></li>
        <li class="count"><a href="cart" data-page="cart"><i class="bi bi-basket3-fill"></i><span class="count">1</span></a></li>
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
