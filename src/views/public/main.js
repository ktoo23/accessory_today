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
      const newListEl = document.getElementById("newList");

      newListEl.innerHTML = "";

      const productCard = document.createElement("div");
      productCard.innerHTML = generateCards(data);
      newListEl.appendChild(productCard);
    })
    .catch ((error) => {
  console.error("Error occured: ", error);
});

function renderIsBestProducts() {
  fetch(`/api/products?isBest=true`)
    .then((response) => response.json())
    .then((data) => {
      const bestListEl = document.getElementById("bestList");

      bestListEl.innerHTML = "";


      const productCard = document.createElement("div");
      productCard.innerHTML = generateCards(data);
      bestListEl.appendChild(productCard);
    })
    .catch((error) => {
      console.error("Error occured", error);
    });




