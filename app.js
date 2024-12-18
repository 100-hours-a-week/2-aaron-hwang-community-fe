import express from 'express';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import indexRouter from './routes/index.js';
import userRouter from './routes/auth.js';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;
const publicPath = join(__dirname, 'public');

app.use(express.static(publicPath));
app.use(cookieParser())
app.use(helmet.xssFilter());
app.use(indexRouter);
app.use(userRouter);


app.listen(port, '0.0.0.0', () => {
    console.log(`Frontend Server listening on port ${port}`);
});
