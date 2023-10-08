document.addEventListener("DOMContentLoaded", function () {
  // URL에서 쿼리 스트링 파싱
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type");

  const formTitleElement = document.getElementById("sumit-form");
  const formTitleInput = document.getElementById("form-title-input");
  const formContent = document.getElementById("form-content");
  const saveButton = document.getElementById("save-button");

  if (type === "review") {
    formTitleElement.textContent = "REAVIEW";

    saveButton.addEventListener("click", function (event) {

      event.preventDefault();
      // 입력 값 검증
      if (
        formTitleInput.value.trim() === "" ||
        formContent.value.trim() === ""
      ) {
        alert("리뷰의 제목과 내용을 모두 입력해주세요.");
        return;
      }
      submitReview(formTitleInput.value, formContent.value);
    });
  } else if (type === "question") {
    formTitleElement.textContent = "Q&A";
    
    saveButton.addEventListener("click", function (event) {

      event.preventDefault();
      // 입력 값 검증
      if (
        formTitleInput.value.trim() === "" ||
        formContent.value.trim() === ""
      ) {
        alert("질문의 제목과 내용을 모두 입력해주세요.");
        return;
      }
      submitQuestion(formTitleInput.value, formContent.value);
    });
  } else {
    alert("알 수 없는 유형입니다. 올바른 폼 유형을 사용해주세요.");
  }
});

// 질문을 제출하는 로직(임시)
function submitReview(title, content) {
  alert("리뷰가 제출되었습니다: " + title + " - " + content);
}

// 리뷰를 제출하는 로직
function submitQuestion(title, content) {
  alert("문의가 제출되었습니다: " + title + " - " + content);
}
