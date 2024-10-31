// TODO: router 합치기
import express from 'express';
import bodyParser from 'body-parser';
import auth from '../controllers/auth-controller.js';

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/signup', auth.getSignup);
router.get('/auth/edit/:id', auth.getUserEdit)

export default router;
