// TODO: router 합치기
import express from 'express';
import bodyParser from 'body-parser';
import { getSignup } from '../controllers/auth-controller.js';

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/signup', getSignup);

export default router;
