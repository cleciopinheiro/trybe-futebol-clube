import TeamModel from '../database/models/team.model';
import MatchModel from '../database/models/match.model';
import calculateHomeStatistics from '../utils/CalculateHomeStatistics';
import orderClassification from '../utils/Classification';

export default class LeaderboardService {
  static async getHome() {
    const teams = await TeamModel.findAll();

    const TeamsHomeStatistics = await teams.map(async (team) => {
      const teamsMatchesHome = await MatchModel.findAll(
        { where: { homeTeamId: team.id, inProgress: false } },
      );

      const teamsMatchesHomeStatistics = await teamsMatchesHome.map((match) => (
        calculateHomeStatistics(team.teamName, [match])));

      const teamsStatistics = teamsMatchesHomeStatistics[teamsMatchesHomeStatistics.length - 1];

      return { ...teamsStatistics };
    });

    const teamsData = await Promise.all(TeamsHomeStatistics);

    return orderClassification(teamsData as unknown as []);
  }
}
