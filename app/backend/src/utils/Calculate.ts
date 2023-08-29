import ILeaderboard from '../interfaces/ILeaderboard';

const totalPoints = (home: ILeaderboard, away: ILeaderboard) => ({
  name: home.name,
  totalPoints: Number(home.totalPoints) + Number(away.totalPoints),
  totalGames: Number(home.totalGames) + Number(away.totalGames),
  totalVictories: Number(home.totalVictories) + Number(away.totalVictories),
  totalDraws: Number(home.totalDraws) + Number(away.totalDraws),
  totalLosses: Number(home.totalLosses) + Number(away.totalLosses),
  goalsFavor: Number(home.goalsFavor) + Number(away.goalsFavor),
  goalsOwn: Number(home.goalsOwn) + Number(away.goalsOwn),
  goalsBalance: 0,
  efficiency: 0,
});

const calculateStatis = (home: ILeaderboard[], away: ILeaderboard[]) => {
  const array: ILeaderboard[] = [];
  home.forEach((homeTeam) => {
    away.forEach((awayTeam) => {
      if (homeTeam.name === awayTeam.name) {
        const team = totalPoints(homeTeam, awayTeam);
        team.goalsBalance = team.goalsFavor - team.goalsOwn;
        team.efficiency = (team.totalPoints / (team.totalGames * 3)) * 100;
        team.efficiency = +(team.efficiency.toFixed(2));
        array.push(team as unknown as ILeaderboard);
      }
    });
  });
  return array;
};

export default calculateStatis;
