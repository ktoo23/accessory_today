document.addEventListener("DOMContentLoaded", function () {
  function renderIsNewProducts() {
    fetch(`/api/products?isNew=true`)
      .then((response) => response.json())
      .then((data) => {
        const newListEl = document.getElementById("newList");
        newListEl.innerHTML = "";

        data.forEach((product) => {
          const newCards = document.createElement("div");
          newCards.classList.add("new-card");
          newCards.innerHTML = `
          <a class="picked-product" href="/products/details/${product._id}">
            <img class="main-product-img" src="${product.productImg}" alt="productImg">
            <div class="main-product-info">
              <p class="main-product-name">${product.productName}</p>
              <p class="main-product-price">KRW ${product.price}</p>
            </div>
          </a>
        `;

        newListEl.appendChild(newCards);
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
          const bestCards = document.createElement("div");
          bestCards.classList.add("best-card");
          bestCards.innerHTML = `
          <a class="picked-product" href="/products/details/${product._id}">
            <img class="main-product-img" src="${product.productImg}" alt="productImg">
            <div class="main-product-info">
              <p class="main-product-name">${product.productName}</p>
              <p class="main-product-price">KRW ${product.price}</p>
            </div>
          </a>
        `;

        bestListEl.appendChild(bestCards);
        })
      })
      .catch((error) => {
        console.error("Error occured: ", error);
      });
    }
  renderIsNewProducts();
  renderIsBestProducts();
});
