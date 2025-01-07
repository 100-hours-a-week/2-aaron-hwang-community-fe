document.addEventListener('DOMContentLoaded', async () => {
    const backButton = document.getElementById('backButton');
    const editPost = document.getElementById('editPost');
    const deletePost = document.getElementById('deletePost');
    const commentInput = document.getElementById('commentInput');
    const submitComment = document.getElementById('submitComment');
    const modalOverlay = document.getElementById('modalOverlay');
    const modalMessage = document.getElementById('modalMessage');
    const modalConfirm = document.getElementById('modalConfirm');
    const modalCancel = document.getElementById('modalCancel');
    const postId = window.location.pathname.split('/').pop();
    const userEdit = document.querySelector('.user-edit');
    const passwordEdit = document.querySelector('.password-edit');
    const logout = document.querySelector('.logout');
    const commentsContainer = document.getElementById('comment-list');
    const likeButton = document.getElementById('likes-wrapper');
    const homeLink = document.getElementById('homeLink');
    let sessionUser;

    await fetch(`${window.fetchURL}/api/users`, {
        method: 'GET',
        credentials: 'include'  // 세션 쿠키를 포함하여 전송
    })
    .then(response => response.json())
    .then(data => {
        sessionUser = data.data;
        const userProfileImage = document.querySelector('.profile-img > img');
        userProfileImage.src = `data:image/jpeg;base64,${data.data.profile_img}`; // 프로필 이미지 설정
        userProfileImage.alt = data.data.username; // 사용자 이름
    })
    .catch(error => {
        console.error('사용자 정보 조회 실패:', error);
        alert("로그인 후 이용해주세요");
        window.location.href = '/';
        // 로그인이 필요한 경우 로그인 페이지로 리디렉션 가능
    });

    // 로그인 상태에 따라 홈링크 다르게 이동
    homeLink.addEventListener('click', () => {
        if (sessionUser) window.location.href = '/posts';
        else window.location.href = '/';
    })

    fetch(`${window.fetchURL}/api/posts/${postId}`, {
        method: 'GET',
        credentials: 'include',
    })
    .then((response) => response.json())
    .then((data) => {
        const post = data.data
        const commentList = post.comments
        const likes = post.likes
        console.log(post)
        console.log(likes.length)

        // 작성자랑 현재 사용자가 다르면 수정/삭제 불가
        if (post.author_id == sessionUser.id) {
            console.log(post.author_id, (post.author_id == sessionUser.id), sessionUser.id)
            editPost.style.display = "block";
            deletePost.style.display = "block";
        }

        document.querySelector('.post-detail h2').textContent = post.title;
        document.querySelector('.author-img img').src = `data:image/jpeg;base64,${post.author_profile_img}`;
        document.querySelector('.post-author').textContent = post.author_username;
        document.querySelector('.post-date').textContent = post.created_at;
        document.querySelector('.post-content').innerHTML = `<p>${post.content}</p>`;
        console.log(post.image);
        post.image? document.querySelector('.post-content-img').src = `data:image/jpeg;base64,${post.image}`:document.querySelector('.post-content-img').style.display='none';
        document.querySelector('#likes-wrapper').innerHTML = `${likes.length >= 1000 ? (likes.length / 1000).toFixed(1) + 'k' : likes.length}<br>좋아요수`;
        document.querySelector('#views-wrapper').innerHTML = `${post.views >= 1000 ? (post.views / 1000).toFixed(1) + 'k' : post.views}<br>조회수`;
        document.querySelector('#comments-wrapper').innerHTML = `${commentList.length >= 1000 ? (commentList.length / 1000).toFixed(1) + 'k' : commentList.length}<br>댓글 수`;
        initializeLikeButton(post);
        likeButton.addEventListener('click', () => toggleLike(post));

        const fetchPromises = commentList.map(async comment => {
            const response = await fetch(`${window.fetchURL}/api/users/${comment.author_id}`, {
                method: 'GET',
                credentials: 'include', // 쿠키 포함
            });
            const data = await response.json();
            return {
                comment,
                commentAuthor: data.data,
            };
        });
        
        // 모든 요청 완료 후 처리
        Promise.all(fetchPromises).then(results => {
            // 최신 댓글 순으로 정렬
            results.sort((a, b) => new Date(b.comment.created_at) - new Date(a.comment.created_at));
        
            results.forEach(({ comment, commentAuthor }) => {
                const commentElement = document.createElement('div');
                commentElement.className = `comment-item`;
                commentElement.setAttribute("alt", comment.id);
                commentElement.innerHTML = `
                    <div class='comment-header'>
                        <div class="post-info">
                            <div class="comment-author-img">
                                <img src="data:image/jpeg;base64,${commentAuthor.profile_img}" alt="프로필 이미지">
                            </div>
                            <span class="comment-author">${commentAuthor.username}</span>
                            <span class="comment-date">${comment.created_at} ${comment.created_at === comment.updated_at ? ' ' : '(수정됨)'}</span>
                        </div>
                        <span id= "comment-content" class="comment-content">${comment.content}</span>
                    </div>
                `;
                // 댓글 작성자랑 현재 사용자가 같은 경우에만 수정/삭제 버튼 추가
                if (commentAuthor.id == sessionUser.id) {
                    commentElement.innerHTML += `
                        <div class="post-detail-button-wrapper">
                            <button id="editComment" class="editComment">수정</button>
                            <button id="deleteComment" class="deleteComment">삭제</button>
                        </div>`;
                }
                commentsContainer.appendChild(commentElement);
            });
        }).catch(error => {
            console.error('Error fetching comments:', error);
        });
    })

    commentsContainer.addEventListener('click', event => {
        const context = event.target.closest('.comment-item');
        if (event.target.classList.contains('editComment')) {
            const commentText = context.querySelector('#comment-content').innerText;
            commentInput.value = commentText;
            submitComment.innerText = '댓글 수정';
            submitComment.disabled = false;
            submitComment.style.backgroundColor = '#fee500';
            submitComment.style.border = 'none';

            submitComment.setAttribute('alt', context.getAttribute('alt'));
        }

        if (event.target.classList.contains('deleteComment')) {
            showModal('댓글을 삭제하시겠습니까?', () => {
                fetch(`${window.fetchURL}/api/comments/${context.getAttribute('alt')}`, {
                    method: 'DELETE',
                    credentials: 'include', // 쿠키 포함
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => {
                    if (response.ok) {
                        window.location.href = `/posts/${postId}`; // 삭제 후 리디렉션
                    } else {
                        response.json().then(data => {
                            alert(data.message || '댓글 삭제에 실패했습니다.');
                        });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('요청 처리 중 오류가 발생했습니다.');
                });
                alert('댓글이 삭제되었습니다.');
            });
        }
    });

    // 뒤로 가기 버튼
    backButton.addEventListener('click', () => {
        history.back();
    });

    // 게시글 수정 버튼
    editPost.addEventListener('click', () => {
        window.location.href = `/posts/edit/${postId}`;
    });

    // 게시글 삭제 버튼
    deletePost.addEventListener('click', () => {
        showModal('게시글을 삭제하시겠습니까?', () => {
            deletePosts(postId);
            alert('게시글이 삭제되었습니다.');
        });
    });

    // 댓글 입력 시 등록 버튼 활성화/비활성화
    commentInput.addEventListener('input', () => {
        if (commentInput.value.trim() !== '') {
            submitComment.disabled = false;
            submitComment.style.backgroundColor = '#fee500';
            submitComment.style.border = 'none';
        } else {
            submitComment.disabled = true;
            submitComment.style.backgroundColor = '#ddd';
        }
    });
    
    submitComment.addEventListener('click', async () => {
        try{
            const commentContent = commentInput.value;
            const flag = submitComment.innerText;
            let response;

            if (flag === '댓글 등록'){
                response = await fetch(`${window.fetchURL}/api/comments/${postId}`, {
                    method: 'POST',
                    credentials: 'include',
                    body: new URLSearchParams({commentContent}),
                });
            }
            else if (flag === '댓글 수정'){
                const commentId = submitComment.getAttribute('alt')
                response = await fetch(`${window.fetchURL}/api/comments/${commentId}`, {
                    method: 'PATCH',
                    credentials: 'include',
                    body: new URLSearchParams({commentContent}),
                });
            }
            if (response.ok) {
                const result = await response.json();
                window.location = `/posts/${postId}`
            } else {
                const error = await response.json();
                alert(error.message || `${flag} 실패했습니다!`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("요청 처리 중 오류가 발생했습니다.");
        }
    });

    // 드롭다운 메뉴 리스너
    // 클릭 이벤트 리스너 추가
    userEdit.addEventListener('click', () => {
        // 회원정보 수정 페이지로 이동하는 예제 코드
        window.location.href = `/auth/edit/${sessionUser.id}`;
    });

    passwordEdit.addEventListener('click', () => {
        // 비밀번호 수정 페이지로 이동하는 예제 코드
        window.location.href = `/auth/change-password/${sessionUser.id}`;
    });

    logout.addEventListener("click", async () => {
        try {
            const response = await fetch('${window.fetchURL}/api/auth/logout', {
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

    

    // 모달 관련 함수
    function showModal(message, confirmCallback) {
        modalOverlay.style.display = 'flex';
        modalMessage.innerText = message;
        modalConfirm.onclick = () => {
            confirmCallback();
            closeModal();
        };
        modalCancel.onclick = closeModal;
    }

    function closeModal() {
        modalOverlay.style.display = 'none';
    }
    // 게시글 삭제 함수
    function deletePosts() {
        fetch(`${window.fetchURL}/api/posts/${postId}`, {
            method: 'DELETE',
            credentials: 'include', // 쿠키 포함
            headers: {
                'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) {
                window.location.href = '/posts'; // 삭제 후 리디렉션
            } else {
                response.json().then(data => {
                    alert(data.message || '게시글 삭제에 실패했습니다.');
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('요청 처리 중 오류가 발생했습니다.');
        });
    }
    // 모달을 통해 게시글 삭제 실행
    document.getElementById('deletePostButton').addEventListener('click', () => {
        showModal('정말로 이 게시글을 삭제하시겠습니까?');
    });

    // 좋아요 버튼 초기 상태 설정
    function initializeLikeButton(post) {
        const likeStatus = post.likes.find(l => l.post_id == post.id && l.user_id == sessionUser.id);
        if (likeStatus){
            if (likeStatus.status == 1){
                console.log(likeStatus.status)
                likeButton.className = 'footer-div-liked'; // 좋아요 상태 클래스 추가
            }
            else {
                likeButton.className = 'footer-div';
            }
        }
    }

    // 좋아요 상태 변경
    function toggleLike(postData) {
        fetch(`${window.fetchURL}/api/posts/${postData.id}/likes`, {
            method: 'POST', // 서버에 좋아요 상태 변경 요청
            credentials: 'include', // 쿠키 포함
        })
        .then(response => response.json())
        .then(data => {
            // 서버 응답에 따라 버튼 스타일 및 좋아요 수 업데이트
            console.log(data)
            const likeCount = data.data.likeCount;

            if (data.data.status) {
                likeButton.className = 'footer-div-liked'
            } else {
                likeButton.className = 'footer-div';
            }

            // 버튼 강제 리로드ㅜㅜ
            likeButton.style.display = "none"; // 일단 숨기기
            setTimeout(() => {
                likeButton.style.display = ""; // 다시 보이게 설정
            }, 0);

            likeButton.innerHTML = `${likeCount >= 1000 ? (likeCount / 1000).toFixed(1) + 'k' : likeCount}<br>좋아요수`;
        })
        .catch(error => console.error('Error toggling like status:', error));
    }
});
