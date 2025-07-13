import { TopTracksService } from "@src/domain/service/topTracksService";
import { TopTracksRequest } from "@src/domain/model/topTracksRequestType";
import { SpotifyClient } from "@src/infrastructure/spotifyClient";

import { Request, Response } from 'express';

export class TopTracksApplication {
    private token: string;
    private topTracksRequest: TopTracksRequest;

    constructor(token: string, topTracksRequest: TopTracksRequest) {
        this.token = token;
        this.topTracksRequest = topTracksRequest
    }

    async get(req: Request, res: Response): Promise<void> {
        const spotifyClient = new SpotifyClient(this.token);
        const topTrackService = new TopTracksService(spotifyClient, this.topTracksRequest);

        try {
            const result = await topTrackService.get();
            const frontendUrl = 'http://localhost:5173/dashboard/top-tracks';
            console.log('Top Tracks Response:', result);
            res.json(result);
            res.redirect(frontendUrl);
        } catch (error) {
            res.status(400).json({ error: error instanceof Error ? error.message : 'Unknown error' });
        }
    }
}
