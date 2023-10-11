let categoryEl = `
    <div class="sidenav">
      <ul id="categorySelect" class="nav nav-pills nav-stacked">
        <li><a href="/products">ALL</a></li>
        <li><a href="/products?category=ring" data-category='ring'>RING</a></li>
        <li><a href="/products?category=earring" data-category='earring'>EARRING</a></li>
        <li><a href="/products?category=bracelet" data-category='bracelet'>BRACELET</a></li>
        <li><a href="/products?category=necklace" data-category='necklace'>NECKLACE</a></li>
    </ul>
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
