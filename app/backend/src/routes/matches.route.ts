import { Router } from 'express';

import MatchesController from '../controllers/matches.controller';

const router = Router();

router.get('/matches', MatchesController.getAll);

export default router;
