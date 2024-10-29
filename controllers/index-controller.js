import path from 'path';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.resolve();

const getIndex = (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
};

export default { getIndex };
