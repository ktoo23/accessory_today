document.addEventListener("DOMContentLoaded", function () {
  const url = window.location.href;
  const type = url.split("/")[6].split("-")[0]; // review or inquiry
  // console.log(type);

  const formTitleElement = document.getElementById("submit-form");
  const formTitleInput = document.getElementById("form-title-input");
  const formContent = document.getElementById("form-content");
  const formAuthor = document.getElementById("form-author-input");
  const saveButton = document.getElementById("save-button");
  const cancelButton = document.getElementById("cancel-button");

  if (type === "review") {
    formTitleElement.textContent = "REVIEW";
    saveButton.addEventListener("click", submitReviewEvent);
    // 취소 버튼 클릭 시 상품 디테일 화면으로 이동
    cancelButton.addEventListener("click", () => {
      window.location.href = `/products/details/${productId}`;
    });
  } else if (type === "inquiry") {
    formTitleElement.textContent = "Q&A";
    saveButton.addEventListener("click", submitQuestionEvent);
    // 취소 버튼 클릭 시 상품 디테일 화면으로 이동
    cancelButton.addEventListener("click", () => {
      window.location.href = `/products/details/${productId}`;
    });
  } else {
    alert("알 수 없는 유형입니다. 올바른 폼 유형을 사용해주세요.");
  }
  // 상품 ID 가져오기 예시 (수정이 필요할 수 있습니다)
  // 상품 ID 현재 path에서 가져오는 부분 경로 수정하면서 [2]에서 [3]으로 바꿨습니다!
  const productId = window.location.pathname.split("/")[3];

  function submitReviewEvent(event) {
    event.preventDefault();
    if (formTitleInput.value.trim() === "" || formContent.value.trim() === "") {
      alert("리뷰의 제목과 내용을 모두 입력해주세요.");
      return;
    }
    const reviewData = {
      title: formTitleInput.value,
      author: formAuthor.value,
      content: formContent.value,
    };
    submitData(
      // 경로가 잘못되었었어요!
      `/api/products/${productId}/review`,
      reviewData,
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
      author: formAuthor.value,
      content: formContent.value,
    };
    submitData(
      // 경로가 잘못되었었어요!
      `/api/products/${productId}/inquiry`,
      questionData,
      "문의가 제출되었습니다: "
    );
  }

  function submitData(apiEndpoint, data, alertMessage) {
    fetch(apiEndpoint, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status === 201) {
          alert(alertMessage + data.title + " - " + data.content);
          window.location.href = `/products/details/${productId}`;
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
