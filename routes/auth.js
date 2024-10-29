// TODO: router 합치기
import express from 'express';
import { loginUser, signupUser } from '../controllers/auth-controller.js';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/login', loginUser);
router.post('/signup', signupUser);

export default router;
