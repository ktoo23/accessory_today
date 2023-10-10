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
