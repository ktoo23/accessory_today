// 회원가입 구현 완료!

const joinButton = document.querySelector(".form-submit-container button");
const joinForm = document.querySelector(".join-form");
const addressSearchBtn = document.querySelector("#address-search");

joinButton.addEventListener("click", joinHandler);
joinForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
addressSearchBtn.addEventListener("click", getAddress);

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

// 주소 검색 api
function getAddress() {
  const postCode = document.getElementById("post-code");
  const streetAddress = document.getElementById("street-address");
  const detailAddress = document.getElementById("detail-address");

  new daum.Postcode({
    oncomplete: function (data) {
      // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

      // 각 주소의 노출 규칙에 따라 주소를 조합한다.
      // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
      var addr = ""; // 주소 변수

      //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
      if (data.userSelectedType === "R") {
        // 사용자가 도로명 주소를 선택했을 경우
        addr = data.roadAddress;
      } else {
        // 사용자가 지번 주소를 선택했을 경우(J)
        addr = data.jibunAddress;
      }

      // 우편번호와 주소 정보를 해당 필드에 넣는다.
      postCode.value = data.zonecode;
      streetAddress.value = addr;
      // 커서를 상세주소 필드로 이동한다.
      detailAddress.focus();
    },
  }).open();
}
