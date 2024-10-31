import express from 'express';
import timeout from 'connect-timeout';
import ratelimit from 'express-rate-limit';
// eslint-disable-next-line import/extensions
import index from '../controllers/index-controller.js';

const router = express.Router();
const limiter = ratelimit({
    windowMs: 60 * 1000, // 1분
    max: 20, // 20회
});

router.get('/', timeout('3s'), limiter, index.getIndex);
router.get('/posts', index.getPosts);
router.get('/posts/edit/:id', index.getPostEdit);
router.get('/posts/create', index.getPostCreate);
router.get('/posts/:id', index.getPostDetail);

export default router;
