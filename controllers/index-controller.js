import path from 'path';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();

const getIndex = (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
};

function getPosts(req, res) {
    return res.sendFile(path.join(__dirname, 'views', 'posts.html'));
}

function getPostDetail(req, res) {
    //console.log(req.body);
    return res.sendFile(path.join(__dirname, 'views', 'post_detail.html'));
}

function getPostCreate(req, res) {
    return res.sendFile(path.join(__dirname, 'views', 'post_create.html'));
}

function getPostEdit(req, res) {
    return res.sendFile(path.join(__dirname, 'views', 'post_edit.html'));
}

export default {
    getIndex,
    getPosts,
    getPostDetail,
    getPostCreate,
    getPostEdit,
};
