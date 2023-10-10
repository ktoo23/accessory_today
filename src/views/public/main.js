const num = 4;

/*
주석 밖 코드는 main.html 테스트를 위한 것
나중에 db연결하면 아래 코드(수정 후) 사용해야함
const generateCards = () => {
  let cards = '';

  for (let i = 0; i < num; i++) {
    cards += `
      <div class="card">
        <img src="../product/prdTempImg.jpg" alt="product img">
        <div class="text">
          <p class="name">name</p>
          <p class="price">price</p>
        </div>
      </div>
    `;
  }

  return cards;
};
*/
const generateCards = () => {
  let cards = "";

  for (let i = 1; i <= num; i++) {
    imgNum = i;
    cards += `
      <div class="mainCard col column-gap">
        <img src="./img/ring${imgNum}.jpg" alt="best img">
      </div>
    `;
  }

  return cards;
};

let bestListEl = `${generateCards()}`;

const initBestList = () => {
  const targetEl = document.getElementById("bestList");
  if (targetEl) {
    targetEl.innerHTML = bestListEl;
  } else {
    console.error("targetEl not found");
  }
};

let newListEl = `${generateCards()}`;

const initNewList = () => {
  const targetEl = document.getElementById("newList");
  if (targetEl) {
    targetEl.innerHTML = newListEl;
  } else {
    console.error("targetEl not found");
  }
};

initBestList();
initNewList();

// 로컬스토리지 Authorization 항목이 있다면 (토큰이 있으면) Login이 아니라 Logout이 되어야 한다.
const link = document.querySelector(".header-right li:first-child a");
if (localStorage.getItem("Authorization")) {
  link.innerText = "LOGOUT";
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
