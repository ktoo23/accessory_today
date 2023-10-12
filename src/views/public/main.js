const generateCards = (product) => `
  <div class="card">
    <img class="product-img" src="${product.productImg}" alt="productImg">
    <div class="product-info">
      <p class="product-name">${product.productName}</p>
      <p class="product-price">${product.price}</p>
    </div>
  </div>
  `;

fetchAndRenderProducts();
function fetchAndRenderProducts() {
  fetch('/api/products?isNew=true')
    .then((response) => response.json())
    .then((data) => {
      console.log(data)
      const bestProducts = data.filter((product) => product.isBest === true);
      const newProducts = data;

      const bestListEl = document.getElementById("bestList");
      const newListEl = document.getElementById("newList");
      bestListEl.innerHTML = "";
      newListEl.innerHTML = "";

      const bestProductsSlice = bestProducts.slice(0, 4);
      const newProductsSlice = newProducts.slice(0, 4);

      bestProductsSlice.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.innerHTML = generateCards(product);
        bestListEl.appendChild(productCard);
      });

      newProductsSlice.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.innerHTML = generateCards(product);
        newListEl.appendChild(productCard);
      });
    })
    .catch((error) => {
      console.error("Error occured", error);
    });

    
}

