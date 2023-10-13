document.addEventListener("DOMContentLoaded", () => {
  fetchAndRenderProducts("");
  document.removeEventListener("DOMContentLoaded", onDOMContentLoaded);

  async function onDOMContentLoaded() {
    await fetchAndRenderProducts();
    document.removeEventListener("DOMContentLoaded", onDOMContentLoaded);
  }

  async function fetchAndRenderProducts(selected) {
    if (selected === null) {
      await fetch(`/api/products`)
        .then((response) => response.json())
        .then((products) => {
          renderProducts(products);
        })
        .catch((error) => {
          console.error("Error: fail to fetch", error);
        });
    } else {
      await fetch(`/api/products?category=${selected}`)
        .then((response) => response.json())
        .then((products) => {
          renderProducts(products);
        })
        .catch((error) => {
          console.error("Error: fail to fetch", error);
        });
    }
  }

  const categories = document.querySelectorAll("#categorySelect li");

  for (let category of categories) {
    category.addEventListener("click", (e) => {
      e.preventDefault();

      const selected = e.target.getAttribute("data-category");

      if (selected === "") {
        fetchAndRenderProducts();
      } else {
        fetchAndRenderProducts(selected);
      }
    });
  }

  const renderProducts = (products) => {
    const prdListEl = document.getElementById("prdList");
    if (prdListEl) {
      prdListEl.innerHTML = "";

      products.forEach((product) => {
        const productCard = document.createElement("div");

        productCard.classList.add("card");
        productCard.innerHTML = `
        <a href="/products/details/${product._id}" class="picked-product">
        <img class="product-img" src="${product.productImg}" alt="productImg">
        <div class="product-info">
          <p class="product-name">${product.productName}</p>
          <p class="product-price">KRW ${product.price}</p>
        </div>
        </a>
        `;

        prdListEl.appendChild(productCard);
      });
    } else {
      console.error(`productListEl not found`);
    }
  };

});

