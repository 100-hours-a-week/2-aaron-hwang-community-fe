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

    // 더미 데이터 생성
    const dummyPosts = [
        {
            id: 1,
            title: "첫 번째 게시글입니다. 이 내용은 테스트입니다.",
            author: {
                username: 'Aaron',
                profile_img: '/images/profile_img.jpg'
            },
            createdAt: '2024-11-01 10:00:00',
            likes: 12000,
            comments: 350,
            views: 200000
        },
        {
            id: 2,
            title: "제목 2",
            author: {
                username: "Edwin",
                profile_img: '/images/profile_img.jpg'
            },
            createdAt: "2024-11-02 09:30:00",
            likes: 800,
            comments: 150,
            views: 950
        },
        {
            id: 3,
            title: "Hi, I'm Leo. title over 26 characters",
            author: {
                username: "Leo",
                profile_img: '/images/profile_img.jpg'
            },
            createdAt: "2024-11-02 09:30:00",
            likes: 8000,
            comments: 150,
            views: 2412412
        },
        {
            id: 4,
            title: "Stella, Team Leader of 9rm",
            author: {
                username: "Stella",
                profile_img: '/images/profile_img.jpg'
            },
            createdAt: "2024-11-02 09:30:00",
            likes: 1000,
            comments: 0,
            views: 1000
        },
    ];

    // 더미 데이터를 HTML에 렌더링
    console.log('Dummy rendering')
    const postsContainer = document.getElementById('post-list');
    dummyPosts.forEach(post => {
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
                        <span class="post-likes">좋아요 ${post.likes >= 1000 ? (post.likes / 1000).toFixed(1) + 'k' : post.likes}</span>
                        <span class="post-views">댓글 ${post.comments >= 1000 ? (post.likes / 1000).toFixed(1) + 'k' : post.comments}</span>
                        <span class="post-reply">조회수 ${post.views >= 1000 ? (post.views / 1000).toFixed(1) + 'k' : post.views}</span>    
                    </div>
                    <div class="post-header-wrapper">
                        <span class="post-date">${post.createdAt}</span>
                    </div>
                </div>                       
            </div>
            <div class="post-footer">
                <img src="${post.author.profile_img}"></img>
                <span class="post-author">${post.author.username}</span>

            </div>
        `;
        postElement.addEventListener('click', () => {
            window.location.href = `/posts/${post.id}`;
        });

        postsContainer.appendChild(postElement);
    });
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
