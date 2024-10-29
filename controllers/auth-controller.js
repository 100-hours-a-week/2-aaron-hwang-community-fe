import login from '../models/user.js';

function loginUser(req, res) {
    const { email, password } = req.body;
    login(email, password, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        if (!user) return res.status(400).send('Invalid credentials');
        return res.status(200).send(`Welcome, ${user.email}`);
    });
}
export default loginUser;
