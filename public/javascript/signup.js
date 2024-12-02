console.log('fe-signup-js-connected');

document.addEventListener("DOMContentLoaded", () => {
    const profileInput = document.getElementById("profile_img");
    const profileHelper = document.getElementById("profile-helper");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("pwd");
    const passwordConfirmInput = document.getElementById("pwd2");
    const usernameInput = document.getElementById("username");
    const submitButton = document.querySelector("button[type='submit']");
    const emailHelper = document.getElementById("email-helper");
    const passwordHelper = document.getElementById("password-helper");
    const password2Helper = document.getElementById("password2-helper");
    const usernameHelper = document.getElementById("username-helper");
    const signupForm = document.getElementById("signupForm");

    submitButton.disabled = true;
    submitButton.style.backgroundColor = "#ddd";
    
    // 프로필 사진 유효성 검사
    function validateProfile() {
        if (!profileInput.files.length) {
            profileHelper.textContent = "프로필 사진을 추가해주세요";
            return false;
        } else {
            profileHelper.textContent = "";
            return true;
        }
    }

    // 이메일 유효성 검사
    function validateEmail() {
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            emailHelper.textContent = "이메일을 입력해주세요";
            return false;
        } else if (!emailRegex.test(email)) {
            emailHelper.textContent = "올바른 이메일 주소 형식을 입력해주세요";
            return false;
        } else {
            emailHelper.textContent = "";
            return true;
        }
    }

    // 비밀번호 유효성 검사
    function validatePassword() {
        const password = passwordInput.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}$/;
        
        if (!password) {
            passwordHelper.textContent = "비밀번호를 입력해주세요";
            return false;
        } else if (!passwordRegex.test(password)) {
            passwordHelper.textContent = "비밀번호 8~20자, 대문자, 소문자, 특수문자 필수로 1개 포함";
            return false;
        } else {
            passwordHelper.textContent = "";
            return true;
        }
    }

    // 비밀번호 확인 유효성 검사
    function validatePasswordConfirm() {
        const password = passwordInput.value;
        const confirmPassword = passwordConfirmInput.value;

        if (!confirmPassword) {
            password2Helper.textContent = "비밀번호를 한 번 더 입력해주세요";
            return false;
        } else if (password !== confirmPassword) {
            password2Helper.textContent = "비밀번호가 다릅니다";
            return false;
        } else {
            password2Helper.textContent = "";
            return true;
        }
    }

    // 닉네임 유효성 검사
    function validateUsername() {
        const username = usernameInput.value;
        const spaceRegex = /\s/;
        
        if (!username) {
            usernameHelper.textContent = "닉네임을 입력해주세요";
            return false;
        } else if (spaceRegex.test(username)) {
            usernameHelper.textContent = "띄어쓰기를 없애주세요";
            return false;
        } else if (username.length > 10) {
            usernameHelper.textContent = "닉네임은 최대 10자 까지 작성 가능합니다";
            return false;
        } else {
            usernameHelper.textContent = "";
            return true;
        }
    }

    // 전체 유효성 검사 함수
    function validateForm() {
        const isProfileValid = validateProfile();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isPasswordConfirmValid = validatePasswordConfirm();
        const isUsernameValid = validateUsername();

        if (isProfileValid && isEmailValid && isPasswordValid && isPasswordConfirmValid && isUsernameValid) {
            submitButton.style.backgroundColor = "#fee500";
            submitButton.disabled = false;
        } else {
            submitButton.style.backgroundColor = "#ddd";
            submitButton.disabled = true;
        }
    }

    // 이벤트 리스너 추가
    profileInput.addEventListener("change", validateForm);
    emailInput.addEventListener("input", validateForm);
    passwordInput.addEventListener("input", validateForm);
    passwordConfirmInput.addEventListener("input", validateForm);
    usernameInput.addEventListener("input", validateForm);

    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault();             
        const email = emailInput.value;
        const pwd = passwordInput.value;
        const pwd2 = passwordConfirmInput.value;
        const profile_img = profileInput.value;
        const username = usernameInput.value;
        
        try {
            const response = await fetch(`http://localhost:8000/api/auth/signup`, {
                method: "POST",
                body: new URLSearchParams({email, pwd, pwd2, profile_img, username}),
                credentials: "include"
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message || "회원가입 되었습니다!");
                window.location = "/posts"
            } else {
                const error = await response.json();
                alert(error.message || "회원 가입에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("요청 처리 중 오류가 발생했습니다.");
        }
    });

    document
        .querySelector('.profile-img-wrapper')
        .addEventListener('click', function () {
        document.getElementById('profile_img').click(); // 이미지 클릭 시 파일 선택창 열기
    });

    document
        .getElementById('profile_img')
        .addEventListener('change', function (event) {
            const reader = new FileReader();
            reader.onload = function () {
                const preview = document.getElementById('profilePreview');
                preview.src = reader.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(event.target.files[0]);
        });
});