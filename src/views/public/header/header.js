
let dropdownCategories = ["ALL", "RING", "EARRING", "BRACELET", "NECKLACE"];

let headerEl = `
<header>  
<div class="container">
<div class="row">
  <div class="logo">
    <img src="../public/img/today-logo.png" alt="logo"/>
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
        <li><a href="../product/product.html">SHOP</a></li>
        <li><a href="">신상품</a></li>
        <li><a href="">Best</a></li>
        <li><a href="">About</a></li>
      </ul>
    </div>

    <div class="col">
      <ul class="header-right">
        <li><a href="">LOGIN</a></li>
        <li><a href="">JOIN</a></li>
        <li><a href="">MYPAGE</a></li>
        <li class="cart"><a href="">주문조회</a></li>
        <li class="count"><a href=""><i class="bi bi-basket3-fill"></i><span class="count">1</span></a></li>
      </ul>
    </div>
  </div>
</header>
`

const initHeader = () => {
  const targetEl = document.getElementById('header');
  if (targetEl) {
    targetEl.innerHTML = headerEl;
  } else {
    console.error('targetEl not found');
  }
};

initHeader();

//브라우저가 좁아질 때 navbar를 숨기기위한 hamburger 사용한다면 쓸 부분
// const navToggle = document.querySelector(".nav-toggle");
// const menu = document.querySelector(".menu");

// navToggle.addEventListener("click", function () {
//   menu.classList.toggle("show-links");
//   if (menu.classList.contains("show-links")) {
//     menu.style.height = "20rem";
//   } else {
//     // 메뉴를 숨길 때
//     menu.style.height = "0";
//   }
// });