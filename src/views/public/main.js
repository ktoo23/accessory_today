const num = 4;

const generateCards = () => {
  let cards = '';

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

let  bestListEl = `${generateCards()}`;

const initBestList = () => {
  const targetEl = document.getElementById('bestList');
  if (targetEl) {
    targetEl.innerHTML = bestListEl;
  } else {
    console.error('targetEl not found');
  }
};

let  newListEl = `${generateCards()}`;

const initNewList = () => {
  const targetEl = document.getElementById('newList');
  if (targetEl) {
    targetEl.innerHTML = newListEl;
  } else {
    console.error('targetEl not found');
  }
};

initBestList();
initNewList();