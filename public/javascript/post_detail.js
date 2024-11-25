document.addEventListener('DOMContentLoaded', () => {
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
    let sessionUserId;

    fetch('http://localhost:8000/api/auth/users', {
        method: 'GET',
        //credentials: 'include'  // 세션 쿠키를 포함하여 전송
    })
    .then(response => response.json())
    .then(data => {
            sessionUserId = data.data.id;
            const userProfileImage = document.querySelector('.profile-img > img');
            userProfileImage.src = data.data.profile_img; // 프로필 이미지 설정
            userProfileImage.alt = data.data.username; // 사용자 이름
    })
    .catch(error => {
            console.error('사용자 정보 조회 실패:', error);
        // 로그인이 필요한 경우 로그인 페이지로 리디렉션 가능
    });

    fetch(`http://localhost:8000/api/posts/${postId}`, {
        method: 'GET',
    })
    .then((response) => response.json())
    .then((data) => {
        const post = data.data
        const author = post.author_id
        const commentList = post.comments
        const likes = post.likes

        document.querySelector('.post-detail h2').textContent = post.title;
        document.querySelector('.author-img img').src = author.profile_img;
        document.querySelector('.post-author').textContent = author.username;
        document.querySelector('.post-date').textContent = post.createdAt;
        document.querySelector('.post-content').innerHTML = `<p>${post.content}</p>`;
        document.querySelector('.post-content-img').src = post.image;
        document.querySelector('#likes-wrapper').innerHTML = `${likes.length >= 1000 ? (likes.length / 1000).toFixed(1) + 'k' : likes.length}<br>좋아요수`;
        document.querySelector('#views-wrapper').innerHTML = `${post.views >= 1000 ? (post.views / 1000).toFixed(1) + 'k' : post.views}<br>조회수`;
        document.querySelector('#comments-wrapper').innerHTML = `${commentList.length >= 1000 ? (commentList.length / 1000).toFixed(1) + 'k' : commentList.length}<br>댓글 수`;
    
        commentList.forEach(comment => {
            
            fetch(`http://localhost:8000/api/auth/users/${comment.author_id}`, {
                method: 'GET',
            })
            .then((response) => response.json())
            .then((data) => {
                const commentAuthor = data.data
                const commentElement = document.createElement('div');
                commentElement.className = `comment-item`;
                commentElement.innerHTML = `
                    <div class='comment-header'>
                        <div class="post-info">
                            <div class="comment-author-img">
                                <img src="${commentAuthor.profile_img}" alt="프로필 이미지">
                            </div>
                            <span class="comment-author">${commentAuthor.username}</span>
                            <span class="comment-date">${comment.createdAt}</span>
                        </div>
                        <span id= "comment-content" class="comment-content">${comment.content}</span>
                    </div>
                    
                `;
                if (data.data.author_id == sessionUserId) {
                    commentElement.innerHTML += `
                    <div class="post-detail-button-wrapper">
                        <button id="editComment" class="editComment">수정</button>
                        <button id="deleteComment" class="deleteComment">삭제</button>
                    </div>`
                }
                commentsContainer.appendChild(commentElement);
    
            })
            const editComment = document.getElementById('editComment');
            const deleteComment = document.getElementById('deleteComment');
            
        })
    })

    commentsContainer.addEventListener('click', event => {
        if (event.target.classList.contains('editComment')) {
            const commentText = event.target.closest('.comment-item').querySelector('#comment-content').innerText;
            commentInput.value = commentText;
            submitComment.innerText = '댓글 수정';
        }

        if (event.target.classList.contains('deleteComment')) {
            showModal('댓글을 삭제하시겠습니까?', () => {
                // TODO: 댓글 삭제 구현
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

    // 드롭다운 메뉴 리스너
    // 클릭 이벤트 리스너 추가
    userEdit.addEventListener('click', () => {
        // 회원정보 수정 페이지로 이동하는 예제 코드
        window.location.href = '/auth/edit/1';
    });

    passwordEdit.addEventListener('click', () => {
        // 비밀번호 수정 페이지로 이동하는 예제 코드
        window.location.href = '/auth/change-password/1';
    });

    logout.addEventListener('click', () => {
        // 로그아웃 처리 예제 코드 (API 호출 또는 페이지 이동 등)
        window.location.href = '/auth/logout/';
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
        fetch(`http://localhost:8000/api/posts/${postId}`, {
            method: 'DELETE',
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
});
