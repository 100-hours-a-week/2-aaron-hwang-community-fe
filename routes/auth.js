// TODO: router 합치기
import express from 'express';
import bodyParser from 'body-parser';
import auth from '../controllers/auth-controller.js';

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/auth/signup', auth.getSignup);
router.get('/auth/edit/:id', auth.getUserEdit);
router.get('/auth/change-password/:id', auth.getPwdEdit);

export default router;
