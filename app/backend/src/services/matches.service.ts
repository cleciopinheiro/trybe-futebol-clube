import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';

export default class MatchesService {
  static async getAll() {
    const matches = await MatchModel.findAll({
      include: [
        { model: TeamModel, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }
}
