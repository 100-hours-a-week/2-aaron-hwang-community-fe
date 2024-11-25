document.addEventListener("DOMContentLoaded", () => {
    const updateForm = document.getElementById("updateForm");
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const imageInput = document.getElementById("file");
    const submitButton = document.getElementById("submit-button");
    const titleHelperText = document.getElementById("title-helper");
    const formHelperText = document.getElementById("form-helper");
    const userEdit = document.querySelector(".user-edit");
    const passwordEdit = document.querySelector(".password-edit");
    const logout = document.querySelector(".logout");
    const postId = window.location.pathname.split('/').pop();
    
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
    updateForm.addEventListener("submit", async (event) => {
        event.preventDefault(); 
        if (!titleInput.value || !contentInput.value) {
            formHelperText.style.display = "block";
            formHelperText.textContent = "제목과 본문을 모두 입력해주세요.";
        } else {
            formHelperText.style.display = "none";
            // TODO: 작성 완료 처리 로직 (API 호출 등)
            const title = titleInput.value;
            const content = contentInput.value;
            const image = imageInput.value; // 이미지 파일 추가

            try {
                const response = await fetch(`http://localhost:8000/api/posts/${postId}`, {
                    method: "PATCH",
                    body: new URLSearchParams({title, content, image}),
                });

                if (response.ok) {
                    const result = await response.json();
                    alert(result.message || "게시글이 수정되었습니다!");
                    window.location = "/posts"
                } else {
                    const error = await response.json();
                    alert(error.message || "게시글 수정에 실패했습니다.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("요청 처리 중 오류가 발생했습니다.");
            }
        }
    });
    // 드롭다운 메뉴 리스너
    // 클릭 이벤트 리스너 추가
    userEdit.addEventListener("click", () => {
        // 회원정보 수정 페이지로 이동하는 예제 코드
        window.location.href = "/auth/edit/1";
    });

    passwordEdit.addEventListener("click", () => {
        // 비밀번호 수정 페이지로 이동하는 예제 코드
        window.location.href = "/auth/change-password/1";
    });

    logout.addEventListener("click", () => {
        // 로그아웃 처리 예제 코드 (API 호출 또는 페이지 이동 등)
        window.location.href = "/auth/logout/";
    });
});