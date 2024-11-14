// 인피니티 스크롤 함수
window.addEventListener('scroll', function () {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMorePosts();
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const userEdit = document.querySelector(".user-edit");
    const passwordEdit = document.querySelector(".password-edit");
    const logout = document.querySelector(".logout");
    const postsContainer = document.getElementById('post-list');

    // 현재 사용자 프로필 사진 요청
    fetch('http://localhost:8000/api/auth/users', {
        method: 'GET',
        credentials: 'include'  // 세션 쿠키를 포함하여 전송
    })
    .then(response => response.json())
    .then(data => {
            console.log(data);
            const userProfileImage = document.querySelector('.profile-img > img');
            userProfileImage.src = data.data.profile_img; // 프로필 이미지 설정
            userProfileImage.alt = data.data.email; // 사용자 이메일
    })
    .catch(error => {
            console.error('사용자 정보 조회 실패:', error);
        // 로그인이 필요한 경우 로그인 페이지로 리디렉션 가능
    });

    fetch('http://localhost:8000/api/posts', {
        method: 'GET'
    })
    .then((response) => response.json())
    .then((data) => {
        data.data.forEach(post => {
            fetch(`http://localhost:8000/api/posts/${post.author_id}/likes`,{
                method: 'GET',
                credentials: 'include'  // 세션 쿠키를 포함하여 전송
            })
            .then((response) => response.json())
            .then((data) => {
                const likes = data.data.length
                
                fetch(`http://localhost:8000/api/posts/author/${post.author_id}`)
                .then((response) => response.json())
                .then((data) => {
                    const author = data.data
                    console.log('likes', likes)
                    const postElement = document.createElement('fieldset');
                    postElement.className = `post-outerline`;

                    // 게시글 제목, 날짜, 작성자 등 표시
                    postElement.innerHTML = `
                        <div class="post-item">
                            <div class="post-header">
                                ${post.title.length > 26 ? post.title.slice(0, 26) + "..." : post.title}
                            </div>
                            <div class="post-body">
                                <div class="post-header-wrapper">
                                    <span class="post-likes">좋아요 ${likes >= 1000 ? (likes / 1000).toFixed(1) + 'k' : likes}</span>
                                    <span class="post-views">댓글 ${post.comments >= 1000 ? (post.comments / 1000).toFixed(1) + 'k' : post.comments}</span>
                                    <span class="post-reply">조회수 ${post.views >= 1000 ? (post.views / 1000).toFixed(1) + 'k' : post.views}</span>    
                                </div>
                                <div class="post-header-wrapper">
                                    <span class="post-date">${post.createdAt}</span>
                                </div>
                            </div>                       
                        </div>
                        <div class="post-footer">
                            <img src="${author.profile_img}"></img>
                            <span class="post-author">${author.username}</span>

                        </div>
                    `;
                    postElement.addEventListener('click', () => {
                        window.location.href = `/posts/${post.id}`;
                    });

                    postsContainer.appendChild(postElement);
                    })
                })

            })

            
    })
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
/*
async function loadMorePosts() {
    // 서버에서 게시글 목록을 추가로 받아오는 함수
    const response = await fetch('/api/posts'); // 예시 API 엔드포인트
    const posts = await response.json();

    const postList = document.querySelector('.post-list');
    posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.classList.add('post-item');

        const title = document.createElement('h3');
        title.classList.add('post-title');
        title.textContent = post.title.length > 26 ? post.title.slice(0, 26) + '...' : post.title;

        const info = document.createElement('div');
        info.classList.add('post-info');
        info.innerHTML = `
            <span class="post-author">${post.author}</span>
            <span class="post-date">${formatDate(post.date)}</span>
            <span class="post-stats">♥ ${formatStats(post.likes)} · 💬 ${formatStats(post.comments)} · 👁 ${formatStats(post.views)}</span>
        `;

        postItem.appendChild(title);
        postItem.appendChild(info);
        postList.appendChild(postItem);
    });
}
    

// 날짜 포맷 함수
function formatDate(dateString) {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const sec = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`;
}

// 숫자 포맷 (k 단위) 함수
function formatStats(number) {
    return number >= 1000 ? (number / 1000).toFixed(1) + 'k' : number;
}
*/
