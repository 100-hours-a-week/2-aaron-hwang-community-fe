document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.getElementById("backButton");
    const editPost = document.getElementById("editPost");
    const deletePost = document.getElementById("deletePost");
    const commentInput = document.getElementById("commentInput");
    const submitComment = document.getElementById("submitComment");
    const editComment = document.getElementById("editComment");
    const deleteComment = document.getElementById("deleteComment");
    const modalOverlay = document.getElementById("modalOverlay");
    const modalMessage = document.getElementById("modalMessage");
    const modalConfirm = document.getElementById("modalConfirm");
    const modalCancel = document.getElementById("modalCancel");
    const postId = window.location.pathname.split('/').pop();
    
    // 뒤로 가기 버튼
    backButton.addEventListener("click", () => {
        history.back();
    });
    
    // 게시글 수정 버튼
    editPost.addEventListener("click", () => {
        window.location.href = `/post/edit/${postId}`;
    });
    

    // 게시글 삭제 버튼
    deletePost.addEventListener("click", () => {
        showModal("게시글을 삭제하시겠습니까?", () => {
            // TODO: 게시글 삭제 로직 실행 (백엔드와 연동)
            alert("게시글이 삭제되었습니다.");
        });
    });

    // 댓글 입력 시 등록 버튼 활성화/비활성화
    commentInput.addEventListener("input", () => {
        if (commentInput.value.trim() !== "") {
            submitComment.disabled = false;
            submitComment.style.backgroundColor = "#fee500";
            submitComment.style.border = 'none';
        } else {
            submitComment.disabled = true;
            submitComment.style.backgroundColor = "#ddd";
        }
    });

    // 댓글 등록/수정 버튼 기능 구현

    // 댓글 수정, 삭제 모달
    editComment.addEventListener("click", () => {
        console.log('aaaaaa')
        const commentText = document.getElementById("comment-content").innerText;
        commentInput.value = commentText;
        submitComment.innerText = "댓글 수정";
    });

    deleteComment.addEventListener("click", () => {
        showModal("댓글을 삭제하시겠습니까?", () => {
            // TODO: 댓글 삭제 로직 실행 (백엔드와 연동)
            alert("댓글이 삭제되었습니다.");
        });
    });


    // 모달 관련 함수
    function showModal(message, confirmCallback) {
        modalOverlay.style.display = "flex";
        modalMessage.innerText = message;
        modalConfirm.onclick = () => {
            confirmCallback();
            closeModal();
        };
        modalCancel.onclick = closeModal;
    }

    function closeModal() {
        modalOverlay.style.display = "none";
    }
});