import { Router } from 'express';

import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

router.get('/leaderboard/home', LeaderboardController.getHome);

export default router;
