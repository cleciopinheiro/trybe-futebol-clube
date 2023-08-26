import { Router } from 'express';

import verifyToken from '../middlewares/token.middleware';
import MatchesController from '../controllers/matches.controller';

const router = Router();

router.get('/matches', MatchesController.getAll);
router.patch('/matches/:id/finish', verifyToken, MatchesController.finish);

export default router;
