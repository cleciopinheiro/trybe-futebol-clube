import { Router } from 'express';

import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

router.get('/leaderboard/home', LeaderboardController.getHome);
router.get('/leaderboard/away', LeaderboardController.getAway);

export default router;
