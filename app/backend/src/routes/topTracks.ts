import { TopTracksApplication } from '../application/topTracksApplictaion';

import { Router } from 'express';

const router = Router();

router.get('/top-tracks', async (req, res) => {
    const token = req.query.access_token as string;
    const term = req.query.term as string || 'medium_term';
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const topTracksRequest = { term, limit, offset };
    const topTracksApplication = new TopTracksApplication(token, topTracksRequest);
    topTracksApplication.get(req, res);
})

export default router;
