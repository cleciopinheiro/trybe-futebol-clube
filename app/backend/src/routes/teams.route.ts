import { Router } from 'express';
import TeamsController from '../controllers/teams.controller';

const router = Router();

router.get('/teams', TeamsController.getAll);

export default router;