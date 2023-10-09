const $carts = document.querySelector(".carts");
const $cartTable = document.querySelector(".cart-table");
const $cartHeader = document.querySelector(".cart-header");
const $cartEmpty = document.querySelector(".cart-empty");
const $optionMenu = document.querySelector(".option-menu");

let cart,
  isAllCheck = false;
// --------------------------------------------------------------------------------
// ------------- localStorage -----------------------------------------------------
// --------------------------------------------------------------------------------

getItems();
function getItems() {
  cart = findCartItem();

  if (cart.length < 1) {
    $carts.style.display = "none";
    $cartEmpty.style.display = "block";
    document.querySelector(".deleteCart").style.display = "none";
  } else {
    $carts.style.display = "flex";
    $cartEmpty.style.display = "none";
    document.querySelector(".deleteCart").style.display = "block";
    cart.forEach((el, idx) => {
      const cartItem = addItemInCart(el, idx);
      $cartTable.insertAdjacentHTML("beforeend", cartItem);
    });
    $cartTable.addEventListener("click", cartEvent);
  }
}

function addItemInCart(item, sequence) {
  let totalPrice = `${item.price * item.quantity}`;
  return `
    <tr id="cart-${sequence}-${item.itemId}">
        <td colspan="2" class="cart-item">
            <div>
                <input type="checkbox" name="check">
                <img src="../public/img/home.png" alt="">
                <div class="cart-item-option">
                    <p class="cart-item-name">${item.productName}</p>
                    <p class="cart-item-size">
                     ${item.size} - ${item.quantity}</p>
                </div>
            </div>
        </td>
        <td class="cart-item-quantity">
            <p>${item.quantity}</p>
            <button class="option-update-btn">옵션/수량 변경</button>
        </td>
        <td class="cart-item-price">
            <p>${changePrice(totalPrice)}</p>
        </td>
        <td>
            <div class="cart-item-btn">
                <button class="deleteBtn">삭제하기</button>
                <button class="orderBtn">상품주문</button>
            </div>
        </td>
    </tr>
    `;
}

// 데이터 삭제
function deleteItem(itemSequence) {
  const $checked = document.querySelectorAll('input[name="check"]:checked');
  cart = findCartItem();

  cart.splice(itemSequence, 1);
  setItems(cart);

  const $cartItems = $cartTable.querySelectorAll(
    "tr:not([class='cart-header'])"
  );
  $cartItems.forEach((el) => el.parentElement.remove());

  getItems();
  if (isAllCheck) {
    const $checkboxes = document.querySelectorAll('input[name="check"]');
    totalPaymentAmount($checkboxes);
    allCheck($checkboxes, true);
  } else if ($checked.length > 1) {
    // 보류 체크 된 상태가 남아있어야 한다.
  }
}

// 전체 삭제
function deleteAllItem() {
  if (confirm("장바구니를 비우시겠습니까?")) {
    localStorage.removeItem("myCart");
    getItems();
    document.querySelector(".deleteAll").style.visibility = "hidden";
  } else return;
}
// 데이터 수정
function updateItem(itemSequence, updateSize, updateQuantity) {
  cart = findCartItem();

  cart[itemSequence].size = updateSize;
  cart[itemSequence].quantity = updateQuantity;

  setItems(cart);

  const $cartItems = $cartTable.querySelectorAll(
    "tr:not([class='cart-header'])"
  );
  $cartItems[`${itemSequence}`].querySelector(
    ".cart-item-quantity p"
  ).innerText = `${updateQuantity}`;
  $cartItems[`${itemSequence}`].querySelector(
    ".cart-item-size"
  ).innerText = `${updateSize} - ${updateQuantity}`;
}

function getItem(itemSequence) {
  cart = findCartItem();
  return cart[itemSequence];
}

// 현재 로컬 스토리지 이름을 cart로 정함. 나중에는 사용자 아이디에 따라 로컬스토리지 생성?
function findCartItem() {
  return JSON.parse(localStorage.getItem("myCart")) || [];
}

function setItems(cart) {
  localStorage.setItem("myCart", JSON.stringify(cart));
}

function changePrice(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function cartEvent(e) {
  if (e.target.tagName === "INPUT") checkEvent(e.target);
  else if (e.target.tagName === "BUTTON") buttonEvent(e.target);
}

// 같은 상품에서 사이즈가 다를 수 있기 때문에
// 상품 아이디가 아닌 localStorage에 담긴 순서, 인덱스로 데이터 조회 수정 삭제
// itemSequence 순서를 담은 변수
let itemSequence;
function returnIdAndSequence(target) {
  let itemId;
  let $itemTarget = target.closest("tr");
  [, itemSequence, itemId] = $itemTarget.id.split("-");
}

document.querySelector(".deleteAll").addEventListener("click", deleteAllItem);

function buttonEvent(target) {
  const name = target.className;
  returnIdAndSequence(target);

  if (name === "option-update-btn") {
    document.querySelector(".modal-layout").classList.remove("display-none");
    showModal(target.closest("tr"));
  } else if (name === "deleteBtn") {
    deleteItem(itemSequence);
  } else if (name === "orderBtn") {
  }
}

function checkEvent(target) {
  const name = target.name;
  const $checkboxes = document.querySelectorAll('input[name="check"]');
  isAllCheck = false;

  if (name === "all-check") {
    if (target.checked) {
      isAllCheck = true;
      totalPaymentAmount($checkboxes);
    } else {
      isAllCheck = false;
      document.querySelector(".items-price").innerText = 0;
      document.querySelector(".payment").innerText = 0;
    }

    allCheck($checkboxes, isAllCheck);
  } else if (name === "check") {
    const $checked = document.querySelectorAll('input[name="check"]:checked');
    const $allCheckbox = document.querySelector('input[name="all-check"]');

    if ($checkboxes.length === $checked.length) $allCheckbox.checked = true;
    else $allCheckbox.checked = false;

    totalPaymentAmount($checked);
  }
}

function allCheck(checkboxes, boolean) {
  checkboxes.forEach((checkbox) => {
    checkbox.checked = boolean;
  });
}

document.querySelector(".dropdown").addEventListener("click", (e) => {
  if (e.target.className === "size") {
    createOptionContent(e);
  }
});

document.querySelectorAll(".option-content").forEach((elem) => {
  elem.addEventListener("click", (e) => {
    optionContentEvent(e);
  });
});

function totalPaymentAmount(checkbox) {
  let priceArr = [];

  checkbox.forEach((elem) => {
    let price = elem
      .closest("tr")
      .querySelector(".cart-item-price p").innerText;
    price = +price.replace(/,/g, "");
    priceArr.push(price);
  });

  let total = priceArr.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
  const deliveryFee = +document.querySelector(".delivery-fee").innerText;

  document.querySelector(".items-price").innerText = changePrice(total);
  document.querySelector(".payment").innerText = changePrice(
    total + deliveryFee
  );
}

// --------------------------------------------------------------------------------
// ------------- modal -------------------------------------------------------------
// --------------------------------------------------------------------------------
const $modalLayout = document.querySelector(".modal-layout");

document.querySelector(".modal-close").addEventListener("click", () => {
  closeModal();
});

document.querySelector(".option-cancel").addEventListener("click", () => {
  closeModal();
});

let itemPrice;
function showModal(target) {
  let item = getItem(itemSequence);
  let { productName, price, quantity, size } = item;
  itemPrice = price;
  const optionHeader = `
    <div class="option-header">
        <img src="../public/img/home.png" alt="">
        <div>
            <p class="option-item-name">${productName}</p>
            <p class="option-item-price">${changePrice(price)}</p>
        </div>
        </div>
    `;

  document
    .querySelector(".modal-card")
    .insertAdjacentHTML("beforebegin", optionHeader);

  const content = `
    <div class="option-content">
        <div>
        <p class="option-size">SIZE ${size}</p>
        <p class="option-delete">X</p>
        </div>
        <div class="option-quantity">
        <div class="minus">-</div>
        <div class="quantity">${quantity}</div>
        <div class="plus">+</div>
        </div>
    </div>
    `;

  document
    .querySelector(".option-menu")
    .insertAdjacentHTML("afterend", content);

  const totalPaymentContent = `
    <div class="option-total-price">
        <p>총수량 ${quantity}개</p>
        <p>${changePrice(price * quantity)}</p>
    </div>
`;

  const $optionContent = document.querySelector(".option-content");

  $optionContent.insertAdjacentHTML("afterend", totalPaymentContent);

  $optionContent.addEventListener("click", (e) => {
    optionContentEvent(e);
  });
}

function closeModal() {
  $modalLayout.classList.add("display-none");
  const $optionItem = document.querySelector(".option-header");
  $optionItem.remove();

  const child = document.querySelector(".modal-card").children;
  Array.from(child).forEach((elem) => {
    if (
      elem.className === "option-content" ||
      elem.className === "option-total-price"
    ) {
      elem.remove();
    }
  });
}

// --------------------------------------------------------------------------------
// ------------- modal option창 ----------------------------------------------------
// --------------------------------------------------------------------------------
document.querySelector(".option-update").addEventListener("click", () => {
  if (document.querySelector(".option-content") === null) {
    alert("필수 옵션을 선택해주세요.");
    return;
  } else {
    const updateQuantity = +document.querySelector(".quantity").innerText;
    const updateSize = document
      .querySelector(".option-size")
      .innerText.split(" ")[1];
    updateItem(itemSequence, updateSize, updateQuantity);
    closeModal();
  }
});

function createOptionContent(e) {
  const selectSize = e.target.innerText;
  const $originSize = document.querySelector(".option-size");

  if ($originSize === null) {
    const content = `
    <div class="option-content">
        <div>
        <p class="option-size">SIZE ${selectSize}</p>
        <p class="option-delete">X</p>
        </div>
        <div class="option-quantity">
        <div class="minus">-</div>
        <div class="quantity">1</div>
        <div class="plus">+</div>
        </div>
    </div>
  `;

    document
      .querySelector(".option-menu")
      .insertAdjacentHTML("afterend", content);

    const $optionContent = document.querySelector(".option-content");

    $optionContent.addEventListener("click", (e) => {
      optionContentEvent(e);
    });
  } else {
    let alreadyChooseSize = false;
    if (`${$originSize.innerText.split(" ")[1]}` === selectSize) {
      alert("이미 선택된 옵션입니다.");
      alreadyChooseSize = true;
    }

    if (alreadyChooseSize) return;

    document.querySelector(".option-size").innerText = `SIZE ${selectSize}`;
    document.querySelector(".quantity").innerText = "1";
  }

  calcOptionTotalPrice();
}

function optionContentEvent(e) {
  switch (e.target.className) {
    case "option-delete":
      deleteOptionContent(e.target);
      break;
    case "minus":
      countOptionItemQuantity(e.target);
      break;
    case "plus":
      countOptionItemQuantity(e.target);
      break;
  }
}

function deleteOptionContent(e) {
  const $parents = e.closest(".option-content");
  $parents.remove();

  calcOptionTotalPrice();
}

// 수량 변경
function countOptionItemQuantity(op) {
  let itemQuantity = document.querySelector(".quantity");
  let value = +itemQuantity.innerText;

  console.log(op, value);
  if (op.innerText === "+") ++value;
  else if (op.innerText === "-") {
    --value;
    if (value < 1) return;
  }

  itemQuantity.innerText = value;
  calcOptionTotalPrice();
}

function calcOptionTotalPrice() {
  const $quantity = document.querySelector(".quantity");
  const $totalOptionQuantity = document.querySelector(
    ".option-total-price > p"
  );
  const $totalOptionPrice = document.querySelector(
    ".option-total-price p:nth-child(2)"
  );

  if ($quantity === null) {
    $totalOptionQuantity.innerText = `총수량 0개`;
    $totalOptionPrice.innerText = 0;
  } else {
    let totalOptionQuantity = +$quantity.innerText;
    $totalOptionQuantity.innerText = `총수량 ${totalOptionQuantity}개`;
    $totalOptionPrice.innerText = changePrice(itemPrice * totalOptionQuantity);
  }
}

// --------------------------------------------------------------------------------
// ------------- dropdown----------------------------------------------------------
// --------------------------------------------------------------------------------
document.querySelector(".dropbtn_click").addEventListener("click", () => {
  dropdown();
});

function dropdown() {
  const $v = document.querySelector(".dropdown-content");
  const $dropbtn = document.querySelector(".dropbtn");
  $v.classList.toggle("show");
  $dropbtn.style.borderColor = "rgb(94, 94, 94)";
}

window.onclick = (e) => {
  if (!e.target.matches(".dropbtn_click")) {
    const $dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < $dropdowns.length; i++) {
      let openDropdown = $dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};
