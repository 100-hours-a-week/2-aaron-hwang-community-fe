console.log('fe-index-js-connected');
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const emailHelperText = document.getElementById('email-helper');
    const passwordInput = document.getElementById('pwd');
    const passwordHelperText = document.getElementById('password-helper');
    const submitButton = document.querySelector('button[type="submit"]');

    submitButton.disable = true;
    submitButton.style.backgroundColor = '#ddd';

    function validateEmail() {
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            emailHelperText.style.display = "block";
            emailHelperText.textContent = "이메일을 입력해주세요.";
            return false;
        } else if (!emailRegex.test(email)) {
            emailHelperText.style.display = "block";
            emailHelperText.textContent = "올바른 이메일 주소 형식을 입력해주세요.";
            return false;
        } else {
            emailHelperText.style.display = "none";
            return true;
        }
    }

    // 비밀번호 유효성 검사 함수
    function validatePassword() {
        const password = passwordInput.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}$/;
        
        if (!password) {
            passwordHelperText.style.display = "block";
            passwordHelperText.textContent = "비밀번호를 입력해주세요.";
            return false;
        } else if (!passwordRegex.test(password)) {
            passwordHelperText.style.display = "block";
            passwordHelperText.textContent = "비밀번호 8~20자, 대문자, 소문자, 특수문자 필수로 1개 포함";
            return false;
        } else {
            passwordHelperText.style.display = "none";
            return true;
        }
    }

    // 전체 유효성 검사 함수
    function validateForm() {
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isEmailValid && isPasswordValid) {
            submitButton.style.backgroundColor = "#fee500";
            submitButton.disabled = false;
        } else {
            submitButton.style.backgroundColor = "#ddd";
            submitButton.disabled = true;
        }
    }

    emailInput.addEventListener("input", validateForm);
    passwordInput.addEventListener("input", validateForm);
    
});

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById("email").value;
    const pwd = document.getElementById("pwd").value;

    fetch("https://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({email,pwd}),
    })
    .then((response) => console.log(response.json()))
    .then((data) => console.log('data: ',data))
})

