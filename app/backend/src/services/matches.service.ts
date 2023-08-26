import MatchModel from '../database/models/match.model';
import TeamModel from '../database/models/team.model';
import IMatchResponse from '../interfaces/IResponse';
import IMatch from '../interfaces/IMatch';

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

  static async create(match: IMatch): Promise<IMatchResponse> {
    if (match.homeTeamId === match.awayTeamId) {
      return { status: 422,
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    const homeTeamExsists = await TeamModel.findByPk(match.homeTeamId);
    const awayTeamExsists = await TeamModel.findByPk(match.awayTeamId);

    if (!homeTeamExsists || !awayTeamExsists) {
      return { status: 404,
        data: { message: 'There is no team with such id!' },
      };
    }

    const matchCreated = await MatchModel.create({ ...match, inProgress: true });

    return { status: 201, data: matchCreated };
  }

  static async update(id: number, data: object) {
    await MatchModel.update(data, { where: { id } });
  }

  static async finish(id: number) {
    await MatchModel.update({ inProgress: false }, { where: { id } });
  }
}
