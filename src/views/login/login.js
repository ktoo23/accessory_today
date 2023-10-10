// 회원 로그인, 비회원 로그인(주문 검증) 구현 완료!

const loginBtn = document.querySelector(".login-btn");
const guestBtn = document.querySelector(".inquiry-btn");
const loginForm = document.querySelector(".login-form");
const guestForm = document.querySelector(".guest-login-form");

loginBtn.addEventListener("click", handleLoginFormSubmit);
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
guestBtn.addEventListener("click", handleGuestLoginSubmit);
guestForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

async function handleLoginFormSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("userEmail").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    alert("모든 정보를 입력해 주세요.");
    return;
  }

  const postData = { email, password };

  await fetch("/api/users/member-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // JSON 데이터 전송을 위한 헤더
    },
    body: JSON.stringify(postData), // POST 데이터를 JSON 문자열로 변환
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 200) {
        window.localStorage.setItem("Authorization", data.accesstoken);
        window.location.href = "/";
      } else {
        alert(data.errMsg);
      }
    })
    .catch((err) => alert(err));
}

async function handleGuestLoginSubmit(e) {
  e.preventDefault();
  const orderer = document.querySelector(".guest-name").value;
  const orderId = document.querySelector(".order-number").value;
  const orderPassword = document.querySelector(".guest-password").value;

  if (!orderer || !orderId || !orderPassword) {
    alert("모든 정보를 입력해 주세요.");
    return;
  }

  const postData = { orderer, orderId, orderPassword };
  await fetch("/api/users/non-member-login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // JSON 데이터 전송을 위한 헤더
    },
    body: JSON.stringify(postData), // POST 데이터를 JSON 문자열로 변환
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == 200) {
        window.location.href = `/non-member/order-tracking/${data.orderId}`;
      } else {
        alert(data.errMsg);
      }
    })
    .catch((err) => alert(err));
}
