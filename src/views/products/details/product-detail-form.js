document.addEventListener("DOMContentLoaded", function () {
  // URL에서 쿼리 스트링 파싱
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type");

  const formTitleElement = document.getElementById("submit-form");
  const formTitleInput = document.getElementById("form-title-input");
  const formContent = document.getElementById("form-content");
  const saveButton = document.getElementById("save-button");

  if (type === "review") {
    formTitleElement.textContent = "REVIEW";
    saveButton.addEventListener("click", submitReviewEvent);
  } else if (type === "question") {
    formTitleElement.textContent = "Q&A";
    saveButton.addEventListener("click", submitQuestionEvent);
  } else {
    alert("알 수 없는 유형입니다. 올바른 폼 유형을 사용해주세요.");
  }
  // 상품 ID 가져오기 예시 (수정이 필요할 수 있습니다)
  const productId = window.location.pathname.split("/")[2];
  console.log("productId:", productId);
  function submitReviewEvent(event) {
    event.preventDefault();
    if (formTitleInput.value.trim() === "" || formContent.value.trim() === "") {
      alert("리뷰의 제목과 내용을 모두 입력해주세요.");
      return;
    }
    const reviewData = {
      title: formTitleInput.value,
      content: formContent.value,
    };
    submitData(
      `/api/products/${productId}/review`,
      reviewData,
      console.log(reviewData),
      "리뷰가 제출되었습니다: "
    );
  }

  function submitQuestionEvent(event) {
    event.preventDefault();
    if (formTitleInput.value.trim() === "" || formContent.value.trim() === "") {
      alert("질문의 제목과 내용을 모두 입력해주세요.");
      return;
    }
    const questionData = {
      title: formTitleInput.value,
      content: formContent.value,
    };
    submitData(
      `/api/products/${productId}/inquiry`,
      questionData,
      "문의가 제출되었습니다: "
    );
  }

  function submitData(apiEndpoint, data, alertMessage) {
    fetch(apiEndpoint, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(alertMessage + data.title + " - " + data.content);
        } else {
          alert("Failed to submit");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Failed to submit");
      });
  }
});
