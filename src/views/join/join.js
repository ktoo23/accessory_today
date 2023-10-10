// 회원가입 구현 완료!

const joinButton = document.querySelector(".form-submit-container button");
const joinForm = document.querySelector(".join-form");

joinButton.addEventListener("click", joinHandler);
joinForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

async function joinHandler(e) {
  e.preventDefault();
  const user = document.getElementById("email-user").value;
  const domain = document.getElementById("email-domain").value;
  const password = document.getElementById("password").value;
  const checkPassword = document.getElementById("confirm-password").value;
  const username = document.getElementById("name").value;
  const postCode = document.getElementById("post-code").value;
  const streetAddress = document.getElementById("street-address").value;
  const detailAddress = document.getElementById("detail-address").value;
  const phone1 = document.getElementById("phone1").value;
  const phone2 = document.getElementById("phone2").value;
  const phone3 = document.getElementById("phone3").value;

  if (
    !user ||
    !domain ||
    !password ||
    !checkPassword ||
    !username ||
    !postCode ||
    !streetAddress ||
    !detailAddress ||
    !phone1 ||
    !phone2 ||
    !phone3
  ) {
    alert("모든 항목을 입력해 주세요.");
    return;
  }

  let reg = new RegExp(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/);
  if (!reg.test(password)) {
    alert("비밀번호를 다시 입력해주세요.");
    return;
  }

  const email = user + "@" + domain;
  const address = `${postCode},${streetAddress},${detailAddress}`;
  const phone = `${phone1}-${phone2}-${phone3}`;

  const postData = {
    email,
    password,
    checkPassword,
    username,
    address,
    phone,
  };

  await fetch("/api/users/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // JSON 데이터 전송을 위한 헤더
    },
    body: JSON.stringify(postData), // POST 데이터를 JSON 문자열로 변환
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.status === 200) {
        alert("회원 가입이 완료되었습니다.");
        // 회원 가입이 정상적으로 완료되면 홈으로 이동
        window.location.href = "/";
      } else {
        // 이메일이 이미 존재하거나 비밀번호가 일치하지 않는 경우
        alert(data.errMsg);
      }
    })
    .catch((err) => alert(err.errMsg));
}
