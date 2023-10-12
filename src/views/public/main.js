fetch("/api/products")
  .then((response) => { response.json(); })
  .then((data) => {
    const bestProducts = data.filter((data) => data.isBest === true);
    const newProducts = data.filter((data) => data.isNew === true);

    const bestListEl = document.getElementById("bestList");
    bestListEl.innerHTML = "";
    const newListEl = document.getElementById("newList");
    newListEl.innerHTML = "";

    bestProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("card");
      productCard.innerHTML = generateCards(product);

      bestListEl.appendChild(productCard);
    });

    newProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("card");
      productCard.innerHTML = generateCards(product);

      newListEl.appendChild(productCard);
    });

    const generateCards = (product) => {
      let card = `
      <img src="${product.productImg}" alt="productImg">
      <div class="product-info">
        <p class="product-name">${product.productName}</p>
        <p class="product-price">${product.price}</p>
      </div>
      `;

      return card;
    }
  });