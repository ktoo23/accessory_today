const generateCards = (product) => `
  <div class="card col">
    <img class="product-img" src="${product.productImg}" alt="productImg">
    <div class="product-info">
      <p class="product-name">${product.productName}</p>
      <p class="product-price">KRW ${product.price}</p>
    </div>
  </div>
  `;

function renderIsNewProducts() {
  fetch(`/api/products?isNew=true`)
    .then((response) => response.json())
    .then((data) => {
      const newListEl = document.getElementById("newList");

      newListEl.innerHTML = "";
      data.forEach((product) => {
        const newCards = generateCards(product);
        newListEl.innerHTML += (newCards);
      })
    })
    .catch((error) => {
      console.error("Error occured: ", error);
    });
}

function renderIsBestProducts() {
  fetch(`/api/products?isBest=true`)
    .then((response) => response.json())
    .then((data) => {
      const bestListEl = document.getElementById("bestList");

      bestListEl.innerHTML = "";

      data.forEach((product) => {
        const bestCards = generateCards(product);
        bestListEl.innerHTML += (bestCards);
      })
    })
    .catch((error) => {
      console.error("Error occured", error);
    });
}
renderIsNewProducts();
renderIsBestProducts();


