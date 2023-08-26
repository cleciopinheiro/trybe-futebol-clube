import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    if (inProgress === 'true') {
      const matchesInProgress = await MatchesService.getProgress();
      return res.status(200).json(matchesInProgress);
    }

    if (inProgress === 'false') {
      const matchesFinished = await MatchesService.getFinished();
      return res.status(200).json(matchesFinished);
    }

    const matches = await MatchesService.getAll();
    return res.status(200).json(matches);
  }

  static async finish(req: Request, res: Response) {
    const { id } = req.params;

    await MatchesService.finish(Number(id));

    return res.status(200).json({ message: 'Finished' });
  }
}
