// eslint-disable-next-line import/no-extraneous-dependencies
import mysql from 'mysql2';
// eslint-disable-next-line import/no-extraneous-dependencies
import dotenv from 'dotenv';

dotenv.config();
const { DB_HOST, DB_USER, DB_PASS, DB_SCHEMA } = process.env;

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    // eslint-disable-next-line camelcase
    database: DB_SCHEMA,
});

connection.connect(err => {
    if (err) {
        console.log('DB CONNECT ERROR', err);
        return;
    }
    console.log('DB connect success');
});

export default connection;
