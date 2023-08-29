// import ILeaderboard from '../interfaces/ILeaderboard';

// const leaderboardModel = (home: ILeaderboard, away: ILeaderboard) => ({
//   name: home.name,
//   totalPoints: 0,
//   totalGames: 0,
//   totalVictories: 0,
//   totalDraws: 0,
//   totalLosses: 0,
//   goalsFavor: 0,
//   goalsOwn: 0,
//   goalsBalance: 0,
//   efficiency: 0,
// });

// const infosByTeam = (home: ILeaderboard, away: ILeaderboard) => ({
//   name: home.name,
//   totalPoints: Number(home.totalPoints) + Number(away.totalPoints),
//   totalGames: Number(home.totalGames) + Number(away.totalGames),
//   totalVictories: Number(home.totalVictories) + Number(away.totalVictories),
//   totalDraws: Number(home.totalDraws) + Number(away.totalDraws),
//   totalLosses: Number(home.totalLosses) + Number(away.totalLosses),
//   goalsFavor: Number(home.goalsFavor) + Number(away.goalsFavor),
//   goalsOwn: Number(home.goalsOwn) + Number(away.goalsOwn),
// });

// const calculateStatis = (home: ILeaderboard[], away: ILeaderboard[]) => {
//   const array: ILeaderboard[] = [];
//   for (let i = 0; i < home.length; i += 1) {
//     for (let j = 0; j < away.length; j += 1) {
//       if (home[i].name === away[j].name) {
//         const team = infosByTeam(home[i], away[j]);
//         team.goalsBalance = team.goalsFavor - team.goalsOwn;
//         team.efficiency = (team.totalPoints / (team.totalGames * 3)) * 100;
//         team.efficiency = +(team.efficiency.toFixed(2));
//         array.push(team as unknown as ILeaderboard);
//       }
//     }
//   }
//   return array;
// };

// export default leaderboardGenerate;
