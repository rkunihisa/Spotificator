import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth';

dotenv.config();
const app = express();
const port = 3000;

// ルーティング登録
app.use('/auth', authRouter);
// /auth/login, /auth/callback

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
