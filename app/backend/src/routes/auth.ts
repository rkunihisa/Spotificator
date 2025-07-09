import { Router, Request, Response } from 'express';
import axios from 'axios';
import { v6 as uuidv6 } from 'uuid';

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET as string;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI as string;

const router = Router();

router.get('/login', (req: Request, res: Response) => {
  const state = uuidv6();
  // add if you want to change the scope
  const scope = 'user-top-read';

  if (req.session) {
    req.session.spotify_auth_state = state;
  }

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    scope: scope,
    redirect_uri: REDIRECT_URI,
    state: state,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
});

router.get('/callback', async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const state = req.query.state as string;

  if (!code || !state || !req.session || state !== req.session.spotify_auth_state) {
    return res.status(400).send('Invalid state or code');
  }

  delete req.session.spotify_auth_state;

  try {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
    });

    const authBuffer = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    const tokenResponse = await axios.post('https://accounts.spotify.com/api/token', params.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${authBuffer}`,
      },
    });

    const { access_token, refresh_token } = tokenResponse.data;
    res.json({ access_token, refresh_token });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({ error: error.response?.data ?? 'Unknown error' });
  }
});

export default router;
