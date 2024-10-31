import path from 'path';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();

const getIndex = (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
};

function getPosts(req, res) {
    return res.sendFile(path.join(__dirname, 'views', 'posts.html'));
}

export default { getIndex, getPosts };
