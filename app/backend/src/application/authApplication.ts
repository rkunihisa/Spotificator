import { Request, Response } from 'express';
import { v6 as uuidv6 } from 'uuid';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
    dotenv.config({ path: '.env.development' });
} else {
    dotenv.config();
}

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET as string;
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI as string;

export class AuthApplication {
    static login(req: Request, res: Response): void {
        const state = uuidv6();
        // add if you want to change the scope
        const scope = 'user-top-read';

        const params = new URLSearchParams({
            response_type: 'code',
            client_id: CLIENT_ID,
            scope: scope,
            redirect_uri: REDIRECT_URI,
            state: state,
        });

        res.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
    };

    static async callback(req: Request, res: Response): Promise<void> {
        const code = req.query.code as string;
        const state = req.query.state as string;

        if (!code || !state) {
            res.status(400).send('Invalid state or code');
            return;
        }

        try {
            const params = new URLSearchParams({
                grant_type: 'authorization_code',
                code: code,
                redirect_uri: REDIRECT_URI,
            });

            const authBuffer = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

            const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Authorization: `Basic ${authBuffer}`,
                },
                body: params.toString(),
            });

            if (!tokenResponse.ok) {
                throw new Error(`Failed to fetch token: ${tokenResponse.status} ${tokenResponse.statusText}`);
            }

            const { access_token, refresh_token } = await tokenResponse.json();
            res.json({ access_token, refresh_token });
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
        }
    }
}
