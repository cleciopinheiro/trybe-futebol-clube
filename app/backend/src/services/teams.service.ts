import TeamModel from '../database/models/team.model';

export default class TeamsService {
  static async getAll() {
    const teams = await TeamModel.findAll();
    return teams;
  }
}
