let categoryEl = `
    <div class="sidenav">
      <ul class="nav nav-pills nav-stacked">
        <li><a href="#">ALL</a></li>
        <li><a href="#">RING</a></li>
        <li><a href="#">EARRING</a></li>
        <li><a href="#">BRACELET</a></li>
        <li><a href="#">NECKLACE</a></li>
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
