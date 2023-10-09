let categoryEl = `
    <div class="sidenav">
      <ul id="categorySelect" class="nav nav-pills nav-stacked">
        <li><a href="#">ALL</a></li>
        <li><a href="#" data-category='ring'>RING</a></li>
        <li><a href="#" data-category='earring'>EARRING</a></li>
        <li><a href="#" data-category='bracelet'>BRACELET</a></li>
        <li><a href="#" data-category='necklace'>NECKLACE</a></li>
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
