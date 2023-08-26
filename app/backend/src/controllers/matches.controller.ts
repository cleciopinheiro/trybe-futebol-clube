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

  static async create(req: Request, res: Response) {
    const match = req.body;

    const matchCreated = await MatchesService.create(match);

    return res.status(matchCreated.status).json(matchCreated.data);
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const data = req.body;

    await MatchesService.update(Number(id), { ...data });

    return res.status(200).json({ message: 'Updated' });
  }

  static async finish(req: Request, res: Response) {
    const { id } = req.params;

    await MatchesService.finish(Number(id));

    return res.status(200).json({ message: 'Finished' });
  }
}
