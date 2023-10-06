let formEl = `
   <div class="form-container">
        <div class="form-title">
            <label for="title" class="form-title-font">Title</label>
            <input type="text" class="form-custom-input" id="title" name="title" placeholder="제목을 입력하세요.">
        </div>
        <textarea id="content" rows="10" cols="65" class="form-content"></textarea>
        <div class="form-btn">
            <input type="submit" value="CANCEL" class="cancel-button">
            <input type="reset" value="OK" class="save-button">
        </div>
    </div>
`;

const initForm = () => {
  const targetEl = document.getElementById("form-template");
  if (targetEl) {
    targetEl.innerHTML = formEl;
  } else {
    console.error("targetEl not found");
  }
};

initForm();
