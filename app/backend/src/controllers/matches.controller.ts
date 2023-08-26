import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
    const matches = await MatchesService.getAll();
    return res.status(200).json(matches);
  }
}
