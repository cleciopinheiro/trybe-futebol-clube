import { Request, Response, NextFunction } from 'express';
import jwt from '../utils/JWT';

export default function verifyToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const token = authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token);

    console.log(decoded);

    req.body.user = decoded;
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
}
