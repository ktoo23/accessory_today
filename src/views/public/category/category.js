let categoryEl = `
    <div class="sidenav">
      <ul id="categorySelect" class="nav nav-pills nav-stacked">
        <li><a href="/products">ALL</a></li>
        <li><a href="/products?category=ring" data-category='ring'>RING</a></li>
        <li><a href="/products?category=earring" data-category='earring'>EARRING</a></li>
        <li><a href="/products?category=bracelet" data-category='bracelet'>BRACELET</a></li>
        <li><a href="/products?category=necklace" data-category='necklace'>NECKLACE</a></li>
    </ul>
    <button class="order-admin"><a href="/admin/order-setting">주문 관리</a></button>
    </div>
    
`;

const initCategory = () => {
  const targetEl = document.getElementById("category");
  if (targetEl) {
    targetEl.innerHTML = categoryEl;
  } else {
    console.error("targetEl not found");
  }
};

initCategory();
