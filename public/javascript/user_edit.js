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
    document.getElementById('userEditForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log('button pushed')
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

            showToast('수정 완료되었습니다.');
        }
    });
    
    // 삭제 하기
    dropUser.addEventListener("click", () => {
        showModal("정말로 탈퇴하시겠습니까?", () => {
            // TODO:  로직 실행 (백엔드와 연동)
            alert("탈퇴되었습니다.");
        });
    });

    function showToast(message) {
        // 백엔드 기능 연결

        // 토스트 메시지 요소 생성
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerText = message;
        toast.setAttribute('style', 'display: block');

        // 토스트 메시지를 body에 추가
        document.body.appendChild(toast);

        // 3초 후에 토스트 메시지 제거
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

    logout.addEventListener("click", () => {
        // 로그아웃 처리 예제 코드 (API 호출 또는 페이지 이동 등)
        window.location.href = "/auth/logout/";
    });
});
