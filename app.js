import express from 'express';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import indexRouter from './routes/index.js';
import userRouter from './routes/auth.js';
import moment from 'moment';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;
const publicPath = `${__dirname}/public`;

app.use(express.static(publicPath));
//app.use(timeout('5s'));
app.use(helmet.xssFilter());
app.use(indexRouter);
app.use(userRouter);


app.listen(port, () => {
    console.log(`Frontend Server listening on port ${port}`);
});
