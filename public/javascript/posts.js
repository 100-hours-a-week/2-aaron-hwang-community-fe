document.addEventListener('DOMContentLoaded', async () => {
    const userEdit = document.querySelector(".user-edit");
    const passwordEdit = document.querySelector(".password-edit");
    const logout = document.querySelector(".logout");
    const postsContainer = document.getElementById('post-list');
    const homeLink = document.getElementById('homeLink');

    let sessionUser;
    // 현재 사용자 프로필 사진 요청
    await fetch(`${window.fetchURL}/api/users`, {
        method: 'GET',
        credentials: 'include'  // 세션 쿠키를 포함하여 전송
    })
    .then(response => response.json())
    .then(data => {
            sessionUser = data.data;
            const userProfileImage = document.querySelector('.profile-img > img');
            userProfileImage.src = `${data.data.profile_img}`; // 프로필 이미지 설정
            userProfileImage.alt = data.data.email; // 사용자 이메일

            
    })
    .catch(error => {
        console.error('사용자 정보 조회 실패:', error);
        alert("로그인 후 이용해주세요.")
        window.location='/'
    });

    // 로그인 상태에 따라 홈링크 다르게 이동
    homeLink.addEventListener('click', () => {
        if (sessionUser) window.location.href = '/posts';
        else window.location.href = '/';
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
            const response = await fetch(`${window.fetchURL}/api/auth/logout`, {
                method: 'POST',
                credentials: 'include', // 세션 쿠키를 포함
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


    let currentPage = 1; // 현재 페이지 번호
    let isLoading = false; // 중복 로드 방지

    // 페이지 최하단 감지 함수
    function detectBottom() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const innerHeight = window.innerHeight;
        const scrollHeight = document.documentElement.scrollHeight;
        return scrollTop + innerHeight >= scrollHeight - 10;
    }

    async function loadMorePosts() {
        if (isLoading) return; // 이미 로딩 중이면 중단

        isLoading = true; // 로딩 상태 설정

        try {
            const response = await fetch(`${window.fetchURL}/api/posts?page=${currentPage}`, {
                method: 'GET',
            });
            const data = await response.json();
            console.log(data)
            // 데이터가 없는 경우 로딩 중단
            if (!data || !data.data || data.data.length === 0 || data.EOD) {
                window.removeEventListener('scroll', scrollHandler);
                isLoading = false;
                return;
            }

            data.data.forEach(post => {
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
                        <img src="${post.author_profile_img}"></img>
                        <span class="post-author">${post.author_username}</span>

                    </div>
                `;
                postElement.addEventListener('click', () => {
                    window.location.href = `/posts/${post.id}`;
                });

                postsContainer.appendChild(postElement);
            });
            currentPage ++;
        }
        catch (error) {
            console.error('게시글 추가 로드 실패:', error);
        } finally {
            isLoading = false; // 로딩 상태 해제
        }
    }

    
    loadMorePosts();
    // 스크롤 이벤트 핸들러
    async function scrollHandler() {
        if (isLoading) return;

        if (detectBottom()) {
            await loadMorePosts(); // 하단 감지 시 추가 게시글 로드
        }
    }
    // 스크롤 이벤트 추가
    window.addEventListener('scroll', scrollHandler);

    
});
