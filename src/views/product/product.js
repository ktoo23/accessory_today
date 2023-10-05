const num = 6; // hard code

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

let prdListEl = `
<section class="prd-list">
        <div class="container">
            <div class="item-list">            
                ${generateCards()}
            </div>
        </div>
</section>
`;

const initProductsList = () => {
  const targetEl = document.getElementById('prdList');
  if (targetEl) {
    targetEl.innerHTML = prdListEl;
  } else {
    console.error('targetEl not found');
  }
};

initProductsList();
