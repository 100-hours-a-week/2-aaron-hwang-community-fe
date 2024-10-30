console.log('fe-signup-js-connected');

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
