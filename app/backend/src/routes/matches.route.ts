import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const router = Router();

router.get('/matches', (req, res) => MatchesController.getAll(req, res));

export default router;
