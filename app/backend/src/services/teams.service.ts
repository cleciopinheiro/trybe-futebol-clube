import TeamModel from '../database/models/team.model';

export default class TeamsService {
  static async getAll() {
    const teams = await TeamModel.findAll();
    return teams;
  }

  static async getById(id: number) {
    const team = await TeamModel.findByPk(id);
    return team;
  }
}
