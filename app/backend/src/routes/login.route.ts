import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import { verifyLogin, verifyPassword, verifyEmail } from '../middlewares/login.middleware';
import verifyToken from '../middlewares/token.middleware';

const router = Router();

router.post(
  '/login',
  verifyLogin,
  verifyEmail,
  verifyPassword,
  (req, res) => LoginController.login(req, res),
);

router.get('/login/role', verifyToken, (req, res) => LoginController.loginValidate(req, res));

export default router;
