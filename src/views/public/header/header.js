let headerEl = `
<header>
  <div class="container"> 
    <div class="row">
      <div class="logo">
        <img src="./img/today-logo.png" alt="logo" id="logo"/>
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
        <li><a href="#" class="navbtn" data-page="products">SHOP</a></li>
        <li><a href="#newTitle" data-page="newItem">신상품</a></li>
        <li><a href="#bestTitle" data-page="bestItem">Best</a></li>
        <li><a href="#" class="navbtn" data-page="about">About</a></li>
      </ul>
    </div>
    <div class="col">
      <ul class="header-right">
        <li><a href="" class="navbtn" data-page="login">LOGIN</a></li>
        <li><a href="" class="navbtn" data-page="join">JOIN</a></li>
        <li><a href="" class="navbtn" data-page="mypage">MYPAGE</a></li>
        <li class="cart" class="navbtn" data-page="order-search"><a href="#">주문조회</a></li>
        <li class="count"><a href="#" class="navbtn" data-page="cart"><i class="bi bi-basket3-fill"></i><span class="count">1</span></a></li>
      </ul>
    </div>
  </div>
</header>
`;


const initHeader = () => {
  const targetEl = document.getElementById('header');
  if (targetEl) {
    targetEl.innerHTML = headerEl;
    const btns = targetEl.querySelectorAll(".navbtn");

    btns.forEach(btn => {
      btn.addEventListener("click", clickHandler);
    });
  } else {
    console.error('targetEl not found');
  }
};

function clickHandler(e) {
  e.preventDefault();

  const clickedLink = e.currentTarget;
  const page = clickedLink.getAttribute("data-page");

  // 페이지 이동 경로 수정할 것
  if (page) {
    switch (page) {
      case "products":
        window.location.href = "../products/product.html";
        break;
      case "newItem": // 경로가 바뀌지 않음 수정 필요
        window.location.href = "../public/main.html#newTitle";
        break;
      case "bestItem":
        window.location.href = "../public/main.html#bestTitle";
        break;
      case "about":
        window.location.href = "../products/product.html";
        break;
      case "login":
        window.location.href = "../login/login.html";
        break;
      case "join":
        window.location.href = "../join/join.html";
        break;
      case "mypage":
        window.location.href = "../mypage/mypage.html";
        break;
      case "order-search": // 회원,비회원 구분 필요
        window.location.href = "../mypage/mypage.html";
        break;
      case "cart":
        window.location.href = "../cart/cart.html";
        break;
      default:
        break;
    }
  }
}

function logoImagePath() {
  const imagePaths = {
    main: "./img/today-logo.png",
    other: "../public/img/today-logo.png"
};

const currentPage = "other";
const logoImage = document.getElementById("logo");

if (logoImage) {
    const imagePath = imagePaths[currentPage];
    console.log(imagePath)
    if (imagePath) {
        logoImage.src = imagePath;
        
    } else {
        console.error("이미지 경로를 찾을 수 없습니다.");
    }
}
}

initHeader();
logoImagePath();