import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';

export default class MatchesService {
  static async getAll() {
    const matches = await MatchModel.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  static async getProgress() {
    const matches = await this.getAll();
    const mathcesInProgress = matches.filter((match) => match.inProgress === true);
    return mathcesInProgress;
  }

  static async getFinished() {
    const matches = await this.getAll();
    const matchesFinished = matches.filter((match) => match.inProgress === false);
    return matchesFinished;
  }

  static async update(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await MatchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  static async finish(id: number) {
    await MatchModel.update({ inProgress: false }, { where: { id } });
  }
}
