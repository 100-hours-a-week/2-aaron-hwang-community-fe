console.log('fe-index-js-connected');
document.addEventListener('DOMContentLoaded', function () {
    const pwdEditForm = document.getElementById('pwdEditForm');
    const passwordInput = document.getElementById('pwd');
    const newPasswordInput1 = document.getElementById('newPassword1');
    const newPasswordInput2 = document.getElementById('newPassword2')
    const submitButton = document.querySelector("button[type='submit']");
    const passwordHelper = document.getElementById('password-helper');
    const newPassword1Helper = document.getElementById('newPassword1-helper');
    const newPassword2Helper = document.getElementById('newPassword2-helper');
    const userId = window.location.pathname.split('/').pop();

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
    function validateNewPassword() {
        const password = newPasswordInput1.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,20}$/;
        
        if (!password) {
            newPassword1Helper.textContent = "비밀번호를 입력해주세요";
            return false;
        } else if (!passwordRegex.test(password)) {
            newPassword1Helper.textContent = "비밀번호 8~20자, 대문자, 소문자, 특수문자 필수로 1개 포함";
            return false;
        } else {
            newPassword1Helper.innerHTML = `&nbsp`;
            return true;
        }
    }

    // 비밀번호 확인 유효성 검사
    function validatePasswordConfirm() {
        const newPassword1 = newPasswordInput1.value;
        const newPassword2 = newPasswordInput2.value;

        if (!newPassword2) {
            newPassword2Helper.textContent = "비밀번호를 한 번 더 입력해주세요";
            return false;
        } else if (newPassword1 !== newPassword2) {
            newPassword2Helper.textContent = "비밀번호가 다릅니다";
            return false;
        } else {
            newPassword2Helper.innerHTML = `&nbsp`;
            return true;
        }
    }

    function validateForm() {
        const isPasswordValid = validatePassword();
        const isNewPasswordValid = validateNewPassword();
        const isPasswordConfirmValid = validatePasswordConfirm();

        if (isPasswordValid && isNewPasswordValid && isPasswordConfirmValid) {
            submitButton.style.backgroundColor = "#fee500";
            submitButton.disabled = false;
        } else {
            submitButton.style.backgroundColor = "#ddd";
            submitButton.disabled = true;
        }
    }

    // 이벤트 리스너 추가
    passwordInput.addEventListener("input", validateForm);
    newPasswordInput1.addEventListener("input", validateForm);
    newPasswordInput2.addEventListener("input", validateForm);

    
    pwdEditForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const password = document.getElementById("pwd").value;
        const newPassword1 = document.getElementById("newPassword1").value;
        const newPassword2 = document.getElementById("newPassword2").value;
        try{
            const response = await fetch(`http://localhost:8000/api/auth/users/${userId}/password`, {
                method: "PATCH",
                body: new URLSearchParams({password, newPassword1, newPassword2}),
            })

            if (response.ok) {
                alert('수정 완료되었습니다.');
                window.location = `/posts`;
            } else {
                alert(response.error.message || "수정에 실패했습니다.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("요청 처리 중 오류가 발생했습니다.");
        }
    })
});