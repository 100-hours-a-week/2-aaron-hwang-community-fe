// 인피니티 스크롤 함수
window.addEventListener('scroll', function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMorePosts();
    }
});
document.addEventListener('DOMContentLoaded', async () => {
    const userEdit = document.querySelector(".user-edit");
    const passwordEdit = document.querySelector(".password-edit");
    const logout = document.querySelector(".logout");
    const postsContainer = document.getElementById('post-list');
    const homeLink = document.getElementById('homeLink');

    let sessionUser;

    // 현재 사용자 프로필 사진 요청
    await fetch(`http://54.180.235.48:8000/api/users`, {
        method: 'GET',
        credentials: 'include'  // 세션 쿠키를 포함하여 전송
    })
    .then(response => response.json())
    .then(data => {
            sessionUser = data.data;
            const userProfileImage = document.querySelector('.profile-img > img');
            userProfileImage.src = `data:image/jpeg;base64,${data.data.profile_img}`; // 프로필 이미지 설정
            userProfileImage.alt = data.data.email; // 사용자 이메일

            
    })
    .catch(error => {
            console.error('사용자 정보 조회 실패:', error);
        // 로그인이 필요한 경우 로그인 페이지로 리디렉션 가능
    });

    // 로그인 상태에 따라 홈링크 다르게 이동
    homeLink.addEventListener('click', () => {
        if (sessionUser) window.location.href = '/posts';
        else window.location.href = '/';
    })
    
    fetch(`http://54.180.235.48:8000/api/posts`, {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        data.data.forEach(post => {
            
            const postElement = document.createElement('fieldset');
            postElement.className = `post-outerline`;
            console.log(post)
            // 게시글 제목, 날짜, 작성자 등 표시
            postElement.innerHTML = `
                <div class="post-item">
                    <div class="post-header">
                        ${post.title.length > 26 ? post.title.slice(0, 26) + "..." : post.title}
                    </div>
                    <div class="post-body">
                        <div class="post-header-wrapper">
                            <span class="post-likes">좋아요 ${post.likes.length >= 1000 ? (post.likes.length / 1000).toFixed(1) + 'k' : post.likes.length}</span>
                            <span class="post-views">댓글 ${post.comments.length >= 1000 ? (post.comments.length / 1000).toFixed(1) + 'k' : post.comments.length}</span>
                            <span class="post-reply">조회수 ${post.views >= 1000 ? (post.views / 1000).toFixed(1) + 'k' : post.views}</span>    
                        </div>
                        <div class="post-header-wrapper">
                            <span class="post-date">${post.created_at}</span>
                        </div>
                    </div>                       
                </div>
                <div class="post-footer">
                    <img src="data:image/jpeg;base64,${post.author_profile_img}"></img>
                    <span class="post-author">${post.author_username}</span>

                </div>
            `;
            postElement.addEventListener('click', () => {
                window.location.href = `/posts/${post.id}`;
            });

            postsContainer.appendChild(postElement);
            })


            
    })
    // 클릭 이벤트 리스너 추가
    userEdit.addEventListener("click", () => {
        // 회원정보 수정 페이지로 이동하는 예제 코드
        window.location.href = `/auth/edit/${sessionUser.id}`;
    });

    passwordEdit.addEventListener("click", () => {
        // 비밀번호 수정 페이지로 이동하는 예제 코드
        window.location.href = `/auth/change-password/${sessionUser.id}`;
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

/* async function loadMorePosts() {
    // 서버에서 게시글 목록을 추가로 받아오는 함수
    const response = await fetch('/api/posts'); // 예시 API 엔드포인트
    const posts = await response.json();

    const postList = document.querySelector('.post-list');
    posts.forEach(post => {
        
        
    });
} */
