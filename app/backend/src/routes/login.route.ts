import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import verifyLogin from '../middlewares/login.middleware';

const router = Router();

router.post('/login', verifyLogin, LoginController.login);

export default router;
