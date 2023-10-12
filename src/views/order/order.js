document.addEventListener("DOMContentLoaded", function () {

  // 쿼리스트링으로 전달된 것이 없으면 장바구니 창에서 상품 주문을 클릭한 것이므로 localstorage order 안에 있는 정보들을 보여 주어야 함.
  const currentQuery = window.location.search;
  if (!currentQuery) {
    showCartProducts();
  }
});


const token = localStorage.getItem("Authorization") || "null";
if (token === "null") { //비회원 주문
  setOrderPasswordForm();
} else { // 회원 주문
  getUserData();
}

async function getUserData() {
  try {
    const response = await fetch("/api/orders/order-sheet", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const userData = await response.json();
    if (userData.userInfo) {
      setUserInfoinShippingForm(userData.userInfo);
    } else {
      setOrderPasswordForm();
    }
  } catch (err) {
    console.error(err);
  }
}

// 주소 검색
const addressSearchBtn = document.querySelector("#address-search");
addressSearchBtn.addEventListener('click', getAddress);

function getAddress() {
  const postCode = document.getElementById("post-code");
  const streetAddress = document.getElementById("street-address");
  const detailAddress = document.getElementById("detail-address");

  new daum.Postcode({
    oncomplete: function (data) {
      var addr = "";
      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }
      postCode.value = data.zonecode;
      streetAddress.value = addr;
      detailAddress.focus();
    },
  }).open();
}

// 유저 정보 미리 배송 정보에 입력
function setUserInfoinShippingForm(data) {
  const {
    _id,
    username,
    address,
    phone,
    email, } = data;

  const addressParts = address.split(',');
  const postCode = addressParts[0];
  const streetAddress = addressParts[1];
  const detailAddress = addressParts[2];

  const phoneParts = phone.split('-');
  const phone1 = phoneParts[0];
  const phone2 = phoneParts[1];
  const phone3 = phoneParts[2];

  const emailParts = email.split('@');
  const emailId = emailParts[0];
  const emailDomain = emailParts[1];

  document.getElementById("receiver-name").value = username;
  document.getElementById("post-code").value = postCode;
  document.getElementById("street-address").value = streetAddress;
  document.getElementById("detail-address").value = detailAddress;
  document.getElementById("phone1").value = phone1;
  document.getElementById("phone2").value = phone2;
  document.getElementById("phone3").value = phone3;
  document.getElementById("email-user").value = emailId;
  document.getElementById("email-domain").value = emailDomain;

  // 이메일 정보 고정
  document.getElementById("email-user").disabled = true;
  document.getElementById("email-domain").disabled = true;
}

// 비회원 주문번호 비밀번호 form 추가
function setOrderPasswordForm() {
  document.getElementById("order-password-section").style.display = "block";
  document.getElementById("confirm-password-section").style.display = "block";
}


const firstPasswordInput = document.getElementById("order-password");
const secondPasswordInput = document.getElementById("confirm-password");
const checkOrderPassword = document.querySelector(".check-password");

firstPasswordInput.addEventListener("blur", checkOrderPasswordEqual);
secondPasswordInput.addEventListener("blur", checkOrderPasswordEqual);

// 주문 비밀번호 일치 확인
function checkOrderPasswordEqual() {
  const firstPassword = firstPasswordInput.value;
  const secondPassword = secondPasswordInput.value;

  if (!(firstPassword === secondPassword)) {
    checkOrderPassword.style.display = "block";
  }

  if (firstPassword === secondPassword) {
    checkOrderPassword.style.display = "none";
  }
}

// 장바구니에서 구매하기로 한 상품 주문서에 띄우기
function getCartProducts() {
  const orderProducts = JSON.parse(localStorage.getItem("order"));
  return orderProducts;
}

// 장바구니에서 선택하여 가져온 상품들을 화면에 보여주기
function showCartProducts() {
  const orderList = document.querySelector(".order-list");
  const orderProducts = getCartProducts();
  console.log(orderProducts);
  let totalPrice = 0;
  for (let i = 0; i < orderProducts.length; i++) {
    const newDiv = document.createElement("div");
    newDiv.id = `product${i + 1}`;
    const product = orderProducts[i];
    console.log(product);
    let html = `<div class="row item-info" id='product${i}'>
      <div class="col-1 item-img"><img src="${product.productImg}"></div>
      <div class="col-4 cart-item-option">${product.productName}</div>
      <div class="col-1 item-price">${product.totalPrice / product.count}</div>
      <div class="col-1 cart-item-quantity">${product.count}</div>
      <div class="col-1 delivery-fee">무료</div>
      <div class="col-1 total-price">${product.totalPrice}</div>
    </div>`;
    newDiv.innerHTML = html;
    // 부모 요소의 마지막 자식 요소 가져오기
    const lastChild = orderList.lastChild;
    // 부모 요소의 마지막 자식 요소의 이전 자식 요소 가져오기 (마지막에서 2번째 자식)
    const secondToLastChild = lastChild.previousElementSibling;
    // 추가할 요소를 부모 요소의 마지막에서 2번째 자식으로 삽입
    orderList.insertBefore(newDiv, secondToLastChild);
    totalPrice += product.totalPrice;
  }
  const cartPrice = document.querySelector(".cart-price");
  cartPrice.innerText = `상품 구매금액 ${totalPrice}원 + 배송비 무료 = 합계 ${totalPrice}원`;

  return totalPrice
}


const submitbtn = document.querySelector(".form-submit-btn");
submitbtn.addEventListener("click", submitForm);

async function submitForm(e) {
  e.preventDefault();

  const user = document.getElementById("email-user").value;
  const domain = document.getElementById("email-domain").value;
  const orderPassword = document.getElementById("order-password").value;
  const orderer = document.getElementById("receiver-name").value;
  const postCode = document.getElementById("post-code").value;
  const streetAddress = document.getElementById("street-address").value;
  const detailAddress = document.getElementById("detail-address").value;
  const phone1 = document.getElementById("phone1").value;
  const phone2 = document.getElementById("phone2").value;
  const phone3 = document.getElementById("phone3").value;

  const email = user + "@" + domain;
  const orderAddress = `${postCode},${streetAddress},${detailAddress}`;
  const orderPhone = `${phone1}-${phone2}-${phone3}`;

  const submitOrderData = {
    orderer,
    orderPassword,
    orderAddress,
    orderPhone,
    email,
    products,
    totalPrice,
  };

  fetch("/api/order/order-sheet", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(submitOrderData),
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.status === 200) {
        console.log('주문 완료');
        const orderId = data.orderId;
        window.location.href = "/order/orderComplete?orderId=" + orderId; 
      } else {
        alert(data.errMsg);
      }
    })
    .catch((err) => alert(err.errMsg));
}