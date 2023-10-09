
let dropdownCategories = ["ALL", "RING", "EARRING", "BRACELET", "NECKLACE"];

let headerEl = `
<header>  
<div class="container">
<div class="row">
  <div class="logo">
    <img src="../../public/img/today-logo.png" alt="logo"/>
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
        <li><a href="">SHOP</a></li>
        <li><a href="#newTitle">신상품</a></li>
        <li><a href="#bestTitle">Best</a></li>
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
`;

const initHeader = () => {
  const targetEl = document.getElementById('header');
  if (targetEl) {
    targetEl.innerHTML = headerEl;
  } else {
    console.error('targetEl not found');
  }
};

function updateDropdownMenu(items) {
  const dropdownMenu = document.querySelector('.nav-item.dropdown .dropdown-menu');
  dropdownMenu.innerHTML = ''; // 기존 메뉴 초기화

  items.forEach((item) => {
    const dropdownItem = document.createElement('li');
    dropdownItem.innerHTML = `<a class="dropdown-item" href="#">${item}</a>`; // href 부분 수정필요
    dropdownMenu.appendChild(dropdownItem);
  });
}

initHeader();
updateDropdownMenu(dropdownCategories);

// 임시 카테고리 드롭다운 추가/삭제 함수
function addDropdownItem(item) {
  dropdownCategories.push(item);
  updateDropdownMenu(dropdownCategories);
}

function removeDropdownItem(item) {
  const index = dropdownCategories.indexOf(item);
  if (index !== -1) {
    dropdownCategories.splice(index, 1);
    updateDropdownMenu(dropdownCategories);
  }
}

const navToggle = document.querySelector(".nav-toggle");
const menu = document.querySelector(".menu");

navToggle.addEventListener("click", function () {
  menu.classList.toggle("show-links");
  if (menu.classList.contains("show-links")) {
    menu.style.height = "20rem"; // 원하는 높이로 설정하세요.
  } else {
    // 메뉴를 숨길 때
    menu.style.height = "0";
  }
});