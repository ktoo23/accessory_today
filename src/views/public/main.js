const generateCards = (product) => `
  <div class="card">
    <img class="product-img" src="${product.productImg}" alt="productImg">
    <div class="product-info">
      <p class="product-name">${product.productName}</p>
      <p class="product-price">${product.price}</p>
    </div>
  </div>
  `;

renderIsNewProducts();
renderIsBestProducts();

function renderIsNewProducts() {
  fetch(`/api/products?isNew=true`)
    .then((response) => response.json())
    .then((data) => {
      const newProducts = data;
      const newListEl = document.getElementById("newList");

      newListEl.innerHTML = "";

      newProductsSlice.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.innerHTML = generateCards(product);
        newListEl.appendChild(productCard);
      });
    })

    .catch((error) => {
      console.error("Error occured: ", error);
    });
}

function renderIsBestProducts() {
  fetch(`/api/products?isBest=true`)
    .then((response) => response.json())
    .then((data) => {
      const bestProducts = data;
      const bestListEl = document.getElementById("bestList");

      bestListEl.innerHTML = "";

      bestProductsSlice.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.innerHTML = generateCards(product);
        bestListEl.appendChild(productCard);
      });
    })
    .catch((error) => {
      console.error("Error occured", error);
    });

}


