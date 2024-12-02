console.log('fe-signup-js-connected');

document.addEventListener("DOMContentLoaded", () => {
    const email = document.getElementById("email");
    const profileImg = document.getElementById("profilePreview");
    const modalOverlay = document.getElementById("modalOverlay");
    const modalMessage = document.getElementById("modalMessage");
    const modalConfirm = document.getElementById("modalConfirm");
    const modalCancel = document.getElementById("modalCancel");
    const dropUser = document.getElementById("dropUser");
    const userEdit = document.querySelector(".user-edit");
    const passwordEdit = document.querySelector(".password-edit");
    const logout = document.querySelector(".logout");
    const editForm = document.getElementById('userEditForm');
    const userId = window.location.pathname.split('/').pop();
    const dummpyUser = {
        id: 1,
        email: 'aaron@naver.com',
        username: 'aaron',
        profile_img: '/images/profile_img.jpg'
    }

    email.innerText = dummpyUser.email;
    profileImg.setAttribute('src', dummpyUser.profile_img);
    document
        .querySelector('.editor-wrapper')
        .addEventListener('click', function () {
        document.getElementById('edit_img').click(); // 이미지 클릭 시 파일 선택창 열기
    });

    document
        .getElementById('edit_img')
        .addEventListener('change', function (event) {
            const reader = new FileReader();
            reader.onload = function () {
                const preview = document.getElementById('profilePreview');
                preview.src = reader.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(event.target.files[0]);
        });

    // 수정하기 버튼 클릭 이벤트
    editForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const helperText = document.getElementById('username-helper');
        helperText.innerHTML = `&nbsp;`;

        // 유효성 검사
        if (username === '') {
            helperText.textContent = '닉네임을 입력해 주세요.';
        } else if (username.length > 11) {
            helperText.textContent = '닉네임은 11자 이내로 입력해 주세요.';
        } else if (username === "중복된닉네임") { // 예시 중복 닉네임 체크
            helperText.textContent = '중복된 닉네임입니다.';
        } else {
            // 유효성 검사가 통과되면 토스트 메시지 표시
            try {
                const response = await fetch(`http://localhost:8000/api/auth/users/${userId}`, {
                    method: "PATCH",
                    body: new URLSearchParams({username}),
                });

                if (response.ok) {
                    showToast('수정 완료되었습니다.');
                    setTimeout(() => {
                        window.location = `/posts`;
                    }, 1500);
                } else {
                    showToast(response.error.message || "닉네임 수정에 실패했습니다.");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("요청 처리 중 오류가 발생했습니다.");
            }
            
        }
    });
    
    // 삭제 하기
    dropUser.addEventListener("click",  () => {
        showModal("정말로 탈퇴하시겠습니까?", async () => {
            try{
                const response = await fetch(`http://localhost:8000/api/auth/users/${userId}`,{
                    method: "DELETE"
                });
                if (response.ok){
                    alert('탈퇴되었습니다');
                    window.location = '/';
                } else {
                    alert("잘못된 요청입니다.");
                }
                
            } catch{
                console.error("Error:", error);
                alert("요청 처리 중 오류가 발생했습니다.");
            }
            
        });
    });

    function showToast(message) {
        // 토스트 메시지 요소 생성
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerText = message;
        toast.setAttribute('style', 'display: block');

        // 토스트 메시지를 body에 추가
        document.body.appendChild(toast);

        // 2초 후에 토스트 메시지 제거
        setTimeout(() => {
            toast.setAttribute('style', 'display: none');
        }, 2000);
    }

    // 모달 관련 함수
    function showModal(message, confirmCallback) {
        modalOverlay.style.display = "flex";
        modalMessage.innerText = message;
        modalConfirm.onclick = () => {
            confirmCallback();
            closeModal();
        };
        modalCancel.onclick = closeModal;
    }

    function closeModal() {
        modalOverlay.style.display = "none";
    }
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
            const response = await fetch('http://localhost:8000/api/auth/logout', {
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
