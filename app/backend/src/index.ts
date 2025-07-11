import express from 'express';
import authRouter from './routes/auth';

const app = express();
const port = 3000;

// /auth/login, /auth/callback
app.use('/auth', authRouter);

// localhost cannot define in Spotify callback URL
app.listen(port, '127.0.0.1', () => {
  console.log(`Listening at http://127.0.0.1:${port}`);
});
