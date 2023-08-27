import { Request, Response } from 'express';

import LeaderboardService from '../services/leaderboard.service';

export default class LeaderboardController {
  static async getHome(req: Request, res: Response) {
    const teams = await LeaderboardService.getHome();

    return res.status(200).json(teams);
  }

  static async getAway(req: Request, res: Response) {
    const teams = await LeaderboardService.getAway();

    return res.status(200).json(teams);
  }
}
