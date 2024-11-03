document.addEventListener("DOMContentLoaded", () => {
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const submitButton = document.getElementById("submit-button");
    const titleHelperText = document.getElementById("title-helper");
    const formHelperText = document.getElementById("form-helper");
    
    backButton.addEventListener("click", () => {
        history.back();
    });
    // 제목 입력 이벤트 핸들러
    titleInput.addEventListener("input", () => {
        const titleLength = titleInput.value.length;

        // 제목 길이 제한 확인
        if (titleLength > 25) {
            titleHelperText.style.display = 'block';
            titleHelperText.textContent = '제목은 26자 이내로 입력해주세요.';
        } else {
            titleHelperText.style.display = "none";
        }

        updateSubmitButtonState();
    });

    // 본문 입력 이벤트 핸들러
    contentInput.addEventListener("input", () => {
        updateSubmitButtonState();
    });

    // 완료 버튼 활성화 상태 업데이트
    function updateSubmitButtonState() {
        if (titleInput.value && contentInput.value && titleInput.value.length <= 26) {
            submitButton.classList.add("active");
            submitButton.disabled = false;
        } else {
            submitButton.classList.remove("active");
            submitButton.disabled = true;
        }
    }

    // 완료 버튼 클릭 핸들러
    submitButton.addEventListener("click", () => {
        if (!titleInput.value || !contentInput.value) {
            formHelperText.style.display = "block";
            formHelperText.textContent = "제목과 본문을 모두 입력해주세요.";
        } else {
            formHelperText.style.display = "none";
            // TODO: 작성 완료 처리 로직 (API 호출 등)
            alert("게시글이 수정되었습니다!");
        }
    });
});