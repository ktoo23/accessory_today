document.addEventListener('DOMContentLoaded', () => {
  const categorySelect = document.getElementById('categorySelect');

  const fetchAndRenderProducts = (selected) => {
    fetch(`/api/products?category=${selected}`)
      .then((response) => response.json())
      .then((products) => {
        renderProducts(products);
      })
      .catch((error) => {
        console.error('Error: fail to fetch', error);
      });
  }

  const renderProducts = (products) => {
    const prdListEl = document.getElementById('prdList');
    if(prdListEl) {
      prdListEl.innerHTML = '';

      products.forEach((product) => {
        const productCard = document.createElement('div');
        productCard.classList.add('card');
        productCard.innerHTML = `
        <img src="${product.productImg}" alt="productImg">
        <div class="product-info">
          <p class="product-name">${product.productName}</p>
          <p class="product-price">${product.price}</p>
        </div>
        `;

        prdListEl.appendChild(productCard);
      });
    } else {
      console.error(`productListEl not found`);
    }
  };

  categorySelect.addEventListener('change', (e) => {
    e.preventDefault();
  
    const selected = categorySelect.value;
    console.log(selected);
  

    fetchAndRenderProducts(selected);

  });

  fetchAndRenderProducts(categorySelect.value);

});
