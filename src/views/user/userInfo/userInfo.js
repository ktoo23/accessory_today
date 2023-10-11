const updateButton = document.querySelector(".form-submit-btn");
const updateForm = document.querySelector(".update-form");
const addressSearch = document.querySelector('#address-search');

const $emailUser = document.querySelector('#email-user');
const $emailDomain = document.querySelector('#email-domain');
const $pwd = document.querySelector('#password');
const $pwdCheck = document.querySelector('#confirm-password');
const $name = document.querySelector('#name');
const $postCode = document.querySelector('#post-code');
const $streetAddress = document.querySelector('#street-address');
const $detailAddress = document.querySelector('#detail-address');
const $phone1 = document.querySelector('#phone1');
const $phone2 = document.querySelector('#phone2');
const $phone3 = document.querySelector('#phone3');

addressSearch.addEventListener('click', getAddress);

updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  updateData();
});

let id = location.href.split('/');
id = id[id.length - 1];
getUserData();

// 주소 검색 api
function getAddress() {
  new daum.Postcode({
    oncomplete: function(data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        var addr = ''; // 주소 변수

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
            addr = data.roadAddress;
        } else { // 사용자가 지번 주소를 선택했을 경우(J)
            addr = data.jibunAddress;
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        $postCode.value = data.zonecode;
        $streetAddress.value = addr;
        // 커서를 상세주소 필드로 이동한다.
        $detailAddress.focus();
    }
}).open();
}

async function getUserData() {
  await fetch(`/api/users/mypage/userinfo-edit?userId=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json", // JSON 데이터 전송을 위한 헤더
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const { status, message, userInfo } = data;
      if (data.status === 200) {
        console.log(userInfo);
        const email = userInfo.email.split('@');
        $emailUser.value = email[0];
        $emailDomain.value = email[1];
        
        $name.value = userInfo.username;
        const phone = userInfo.phone.split('-');
        $phone1.value = phone[0];
        $phone2.value = phone[1];
        $phone3.value = phone[2];

        const address = userInfo.address.split(',');
        $postCode.value = address[0];
        $streetAddress.value = address[1];
        $detailAddress.value = address[2];

      } else {
        console.error(error);
      }
    })
    .catch((err) => console.log(err.errMsg));
}

async function updateData() {
  
  const email = $emailUser.value + "@" + $emailDomain.value;
  const address = `${$postCode.value},${$streetAddress.value},${$detailAddress.value}`;
  const phone = `${$phone1.value}-${$phone2.value}-${$phone3.value}`;
  const username = $name.value;
  const password = $pwd.value;
  const checkPassword = $pwdCheck.value;

  let reg = new RegExp(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/);
  if (reg.test(password) === false) {
    alert("비밀번호를 다시 입력해주세요.")
    $pwd.focus();
    return;
  }
  if (password !== checkPassword) {
    alert('비밀번호가 일치하지 않습니다');
    $pwdCheck.value = "";
    return;
  }
  const updateData = {
    email,
    password,
    checkPassword,
    username,
    address,
    phone,
  };

  await fetch(`/api/users/mypage/userinfo-edit?userId=${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json", // JSON 데이터 전송을 위한 헤더
    },
    body: JSON.stringify(updateData), // POST 데이터를 JSON 문자열로 변환
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if (data.status === 200) {
        alert("회원 정보가 수정되었습니다.");
        window.location.href="/mypage";
      }
    })
    .catch((err) => console.log(err.errMsg));
}
