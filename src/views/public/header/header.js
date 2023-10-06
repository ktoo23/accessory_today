
let dropdownCategories = ["ALL", "RING", "EARRING", "BRACELET", "NECKLACE"];

let headerEl = `
<header>
<div class="logo">
  <img src="./img/today-logo.png" alt="logo"/>
</div>

<div class="header-nav">
<div class="search">
  <form action="/search" method="GET">
    <input type="text" id="search" name="q" placeholder="SEARCH">
    <button type="submit" class="search-btn"><i class="bi bi-search"></i></button>
  </form>
</div>
  <ul class="header-middle">
    <li class="nav-item dropdown">
      <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        SHOP
      </a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">ALL</a></li>
        <li><a class="dropdown-item" href="#">RING</a></li>
        <li><a class="dropdown-item" href="#">EARRING</a></li>
        <li><a class="dropdown-item" href="#">BRACELET</a></li>
        <li><a class="dropdown-item" href="#">NECKLACE</a></li>
      </ul>
    </li>
    <li><a href="">신상품</a></li>
    <li><a href="">Best</a></li>
    <li><a href="">About</a></li>
  </ul>

  <ul class="header-right">
    <li><a href="">LOGIN</a></li>
    <li><a href="">JOIN</a></li>
    <li><a href="">MYPAGE</a></li>
    <li><a href="">주문조회</a></li>
    <li><a href=""><i class="bi bi-basket3-fill"></i><span class="count">1</span></a></li>
    
  </ul>
</div>
</header>
`;

const initHeader = () => {
  const targetEl = document.getElementById('header');
  if(targetEl) {
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