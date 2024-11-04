console.log('fe-index-js-connected');
document.addEventListener('DOMContentLoaded', function () {
    const pwdEditForm = document.getElementById('pwdEditForm');
    const passwordInput = document.getElementById('pwd');
    const passwordConfirmInput = document.getElementById('pwd2');
    const submitButton = document.querySelector("button[type='submit']");
    const passwordHelper = document.getElementById('password-helper');
    const password2Helper = document.getElementById('password2-helper');

    submitButton.disable = true;
    submitButton.style.backgroundColor = '#ddd';

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
            passwordHelper.innerHTML = `&nbsp`;
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
            password2Helper.innerHTML = `&nbsp`;
            return true;
        }
    }

    function validateForm() {
        const isPasswordValid = validatePassword();
        const isPasswordConfirmValid = validatePasswordConfirm();

        if (isPasswordValid && isPasswordConfirmValid) {
            submitButton.style.backgroundColor = "#fee500";
            submitButton.disabled = false;
        } else {
            submitButton.style.backgroundColor = "#ddd";
            submitButton.disabled = true;
        }
    }

    // 이벤트 리스너 추가
    passwordInput.addEventListener("input", validateForm);
    passwordConfirmInput.addEventListener("input", validateForm);

    
    pwdEditForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const userId = window.location.pathname.split('/').pop();
        const password = document.getElementById("pwd").value;
        console.log(userId,password);
        /*
        fetch("https://localhost:8000/api/change-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({userId,pwd}),
        })
        .then((response) => console.log(response.json()))
        .then((data) => console.log('data: ',data))
        */
    })
});