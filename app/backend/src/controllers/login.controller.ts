import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const response = await LoginService.login(email, password);

    return res.status(response.status).json(response.data);
  }

  static async loginValidate(req: Request, res: Response) {
    const { email } = req.body.user;

    const response = await LoginService.loginValidate(email);

    return res.status(response.status).json(response.data);
  }
}
