// TODO: router 합치기
import express from 'express';
import bodyParser from 'body-parser';

const router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/login', function (req, res) {
    const id = req.body.uid;
    const pwd = req.body.pwd;
    const body = JSON.stringify({ id, pwd });
    console.log(body);
    res.json(body);
});

export default router;
