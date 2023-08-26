import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

function verifyLogin(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  next();
}

function verifyEmail(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;
  if (!validator.isEmail(email)) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
}

function verifyPassword(req: Request, res: Response, next: NextFunction) {
  const { password } = req.body;
  if (!validator.isLength(password, { min: 6 })) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
}

export {
  verifyLogin,
  verifyEmail,
  verifyPassword,
};
