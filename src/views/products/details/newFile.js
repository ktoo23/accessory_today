document.addEventListener("DOMContentLoaded", function () {
  // URL에서 쿼리 스트링 파싱
  const urlParams = new URLSearchParams(window.location.search);
  const type = urlParams.get("type");

  const formTitleElement = document.getElementById("submit-form");
  const formTitleInput = document.getElementById("form-title-input");
  const formContent = document.getElementById("form-content");
  const saveButton = document.getElementById("save-button");
  const form = document.querySelector("form");

  if (type === "review") {
    formTitleElement.textContent = "REVIEW";

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

  //   form.addEventListener("submit", function (event) {
  //     event.preventDefault();
  //     const formData = new FormData(form);
  //     let apiEndpoint;
  //     if (type === "review") {
  //       apiEndpoint = "/api/products/{productId}/review-upload";
  //     } else if (type === "question") {
  //       apiEndpoint = "/products/{productId}/inquiry-upload";
  //     } else {
  //       alert("Unknown type");
  //       return;
  //     }
  //     fetch(apiEndpoint, {
  //       method: "POST",
  //       body: formData,
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         if (data.success) {
  //           alert("Submission successful!");
  //         } else {
  //           alert("Failed to submit");
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("Error:", err);
  //         alert("Failed to submit");
  //       });
  //   });
  //   function submitReview(title, content) {
  //     alert("리뷰가 제출되었습니다: " + title + " - " + content);
  //   }
  //   function submitQuestion(title, content) {
  //     alert("문의가 제출되었습니다: " + title + " - " + content);
  //   }
  // });
  review.addEventListener("submit", function (event) {
    event.preventDefault();

    const reviewData = new ReviewData(form);

    let apiEndpoint;
    if (type === "review") {
      apiEndpoint = "/api/products/{productId}/review-upload";
    } else if (type === "question") {
      apiEndpoint = "/products/{productId}/inquiry-upload";
    } else {
      alert("Unknown type");
      return;
    }

    fetch(apiEndpoint, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Submission successful!");
        } else {
          alert("Failed to submit");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Failed to submit");
      });
  });

  function submitReview(title, content) {
    alert("리뷰가 제출되었습니다: " + title + " - " + content);
  }

  function submitQuestion(title, content) {
    alert("문의가 제출되었습니다: " + title + " - " + content);
  }
});
