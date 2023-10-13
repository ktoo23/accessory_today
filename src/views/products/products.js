document.addEventListener("DOMContentLoaded", () => {
  const curUrl = window.location.href;
  const query = curUrl.split("?")[1];
  // 상품 목록 페이지에서 접근하거나 상품 디테일 페이지에서 ALL을 클릭했을 경우
  if (!query) {
    fetchAndRenderProducts("");
    document.removeEventListener("DOMContentLoaded", onDOMContentLoaded);
  } else {
    // 상품 디테일 페이지에서 ALL이 아닌 카테고리를 클릭하여 들어올 때
    const catecory = query.split("=")[1];
    fetchAndRenderProducts(catecory);
    document.removeEventListener("DOMContentLoaded", onDOMContentLoaded);
  }

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

      if (selected === "" || selected === null) {
        window.location.href = "/products";
      } else {
        // fetchAndRenderProducts(selected);
        window.location.href = `/products?category=${selected}`;
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

