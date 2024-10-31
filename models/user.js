//import connection from './db.js';

/*
function login(email, password, callback) {
    const sql = `SELECT * FROM user WHERE email = ? AND password = ?`;
    connection.query(sql, [email, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const user = results[0];
            callback(null, user);
        } else {
            callback(null);
        }
    });
}

function formatDate(timestamp) {
    const date = new Date(timestamp);

    // 연도, 월, 일
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2); // 1월은 0부터 시작하므로 +1
    const day = `0${date.getDate()}`.slice(-2);

    // 시, 분, 초
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);

    // 최종 포맷 yyyy-mm-dd hh:mm:ss
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function signup(email, password, callback) {
    const sql = 'INSERT INTO user (email, password, created_at) VALUES (?, ?, ?)';

    connection.query(sql, [email, password, formatDate(Date.now())], (err, result) => {
        if (err) throw err;
        callback(null, result); // 성공 시 삽입 결과 반환
    });
}

export { login, signup };
*/