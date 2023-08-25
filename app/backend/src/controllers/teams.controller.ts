import { Request, Response } from 'express';
import TeamService from '../services/teams.service';

export default class TeamsController {
  static async getAll(req: Request, res: Response) {
    const teams = await TeamService.getAll();
    res.status(200).send(teams);
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const team = await TeamService.getById(Number(id));
    res.status(200).send(team);
  }
}
