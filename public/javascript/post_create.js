document.addEventListener("DOMContentLoaded", async () => {
    const titleInput = document.getElementById("title");
    const contentInput = document.getElementById("content");
    const submitButton = document.getElementById("submit-button");
    const imageInput = document.getElementById("file");
    const titleHelperText = document.getElementById("title-helper");
    const formHelperText = document.getElementById("form-helper");
    const userEdit = document.querySelector(".user-edit");
    const passwordEdit = document.querySelector(".password-edit");
    const logout = document.querySelector(".logout");
    const createForm = document.getElementById("createForm")
    const homeLink = document.getElementById("homeLink");
    let sessionUser;

    await fetch(`http://54.180.235.48:8000/api/users`, {
        method: 'GET',
        credentials: 'include'  // 세션 쿠키를 포함하여 전송
    })
    .then(response => response.json())
    .then(data => {
        sessionUser = data.data;
        const userProfileImage = document.querySelector('.profile-img > img');
        userProfileImage.src = `data:image/jpeg;base64,${data.data.profile_img}`; // 프로필 이미지 설정
        userProfileImage.alt = data.data.username; // 사용자 이름
        
        // 로그인 상태이면 게시글 페이지로 이동
        if (sessionUser) homeLink.href = '/posts';
    })
    .catch(error => {
            console.error('사용자 정보 조회 실패:', error);
        // 로그인이 필요한 경우 로그인 페이지로 리디렉션 가능
    });
    
    backButton.addEventListener("click", () => {
        history.back();
    });
    // 제목 입력 이벤트 핸들러
    titleInput.addEventListener("input", () => {
        const titleLength = titleInput.value.length;

        // 제목 길이 제한 확인
        if (titleLength > 26) {
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

    const createPost = async (title, content, imageFile) => {
        try {

            const formData = new FormData();
            formData.append('title', title); // 텍스트 데이터
            formData.append('content', content); // 텍스트 데이터
            if (imageFile) {
                formData.append('image', imageFile); // 파일 데이터
            }

            const response = await fetch(`http://54.180.235.48:8000/api/posts/`, {
                method: "POST",
                credentials: "include",
                body: formData
            });

            const responseData = await response.json();

            if (!response.ok) throw new Error(responseData.message || '게시글 작성에 실패했습니다.'); 
                
            console.log(responseData.data)
            alert("게시글이 작성되었습니다!");
            window.location = "/posts"
            
        } catch (error) {
            console.error("Error:", error);
            alert(error.message);
        }
    }
    // 완료 버튼 클릭 핸들러
    createForm.addEventListener("submit", async (event) => {
        event.preventDefault(); 
        if (!titleInput.value || !contentInput.value) {
            formHelperText.style.display = "block";
            formHelperText.textContent = "제목과 본문을 모두 입력해주세요.";
        } else {
            formHelperText.style.display = "none";
            
            const title = titleInput.value;
            const content = contentInput.value;
            const image = imageInput.files[0];

            await createPost(title, content, image);
            
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

    logout.addEventListener("click", async () => {
        try {
            const response = await fetch(`http://54.180.235.48:8000/api/auth/logout`, {
                method: 'POST',
                // credentials: 'include', // 세션 쿠키를 포함
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message || '로그아웃 성공!');
                window.location.href = '/'; // 로그아웃 후 로그인 페이지로 이동
            } else {
                const error = await response.json();
                alert(error.message || '로그아웃 실패!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('로그아웃 요청 중 오류가 발생했습니다.');
        }
        
    });
});