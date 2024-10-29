import connection from './db.js';

function login(email, password, callback) {
    const sql = `SELECT * FROM user WHERE email = ? AND password = ?`;
    connection.query(sql, [email, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const user = results[0];
            console.log('Login success: ', user);
            callback(null, user);
        } else {
            callback(null);
        }
    });
}

export default login;
