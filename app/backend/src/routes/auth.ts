import { AuthApplication } from '../application/authApplication';

import { Router } from 'express';

const router = Router();

router.get('/login', AuthApplication.login);
router.get('/callback', AuthApplication.callback);

export default router;
