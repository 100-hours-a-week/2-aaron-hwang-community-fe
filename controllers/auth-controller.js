import path from 'path';

const __dirname = path.resolve();
/*
function loginUser(req, res) {
    const { email, password } = req.body;

    login(email, password, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        if (!user) return res.status(400).send('로그인에 실패했습니다.');
        return res.status(200).send(`안녕하세요, ${user.email}`);
    });
}
*/
function getSignup(req, res) {
    return res.sendFile(path.join(__dirname, 'views', 'signup.html'));
}

/*
function signupUser(req, res) {
    const { email, password } = req.body;
    signup(email, password, (err, result) => {
        if (err) return res.status(500).send('가입에 실패했습니다.');
        return res.status(200).send('회원가입 성공!');
    });
}
*/
export { getSignup };
