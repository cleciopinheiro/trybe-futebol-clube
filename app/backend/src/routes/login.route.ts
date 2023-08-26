import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import verifyLogin from '../middlewares/login.middleware';
// import verifyToken from '../middlewares/token.middleware';

const router = Router();

router.post('/login', verifyLogin, (req, res) => LoginController.login(req, res));

export default router;
