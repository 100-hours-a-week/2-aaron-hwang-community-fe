// TODO: router 합치기
import express from 'express';
import bodyParser from 'body-parser';
import { loginUser, signupUser, getSignup } from '../controllers/auth-controller.js';

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/login', loginUser);
router.get('/signup', getSignup)
router.post('/signup', signupUser);

export default router;
