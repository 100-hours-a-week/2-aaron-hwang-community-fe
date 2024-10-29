import express from 'express';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import indexRouter from './routes/index.js';
import userRouter from './routes/auth.js';
import dotenv from 'dotenv';
import mysql from 'mysql';
import moment from 'moment';
import { connect } from 'http2';

dotenv.config();
const { db_host, db_user, db_pass } = process.env;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;
const publicPath = `${__dirname}/public`;
const connection = mysql.createConnection({
    host: db_host,
    user: db_user,
    password: db_pass,
    database: 'community'
});
connection.connect(() => {
    console.log('DB connect success');
});

app.use(express.static(publicPath));
//app.use(timeout('5s'));
app.use(helmet.xssFilter());
app.use(indexRouter);
app.use(userRouter);


app.listen(port, () => {
    console.log('Server listening on port 3000');
});
