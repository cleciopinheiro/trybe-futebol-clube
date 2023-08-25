import { Request, Response } from 'express';
import LoginService from '../services/login.service';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const response = await LoginService.login(email, password);
    if (!response) return res.status(404).json({ message: 'Unauthorized' });
    return res.status(200).json(response);
  }
}
