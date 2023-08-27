import IMatch from '../interfaces/IMatch';

const team = {
  name: '',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
  goalsBalance: 0,
  efficiency: 0,
};

const resetTeams = () => {
  team.totalPoints = 0;
  team.totalGames = 0;
  team.totalVictories = 0;
  team.totalDraws = 0;
  team.totalLosses = 0;
  team.goalsFavor = 0;
  team.goalsOwn = 0;
  team.goalsBalance = 0;
  team.efficiency = 0;
};

const addVicitoriesHome = (homeGoals: number, awayGoals: number) => {
  team.totalPoints += 3;
  team.totalVictories += 1;
  team.goalsFavor += homeGoals;
  team.goalsOwn += awayGoals;
};

const addVicitoriesAway = (homeGoals: number, awayGoals: number) => {
  team.totalPoints += 3;
  team.totalVictories += 1;
  team.goalsFavor += awayGoals;
  team.goalsOwn += homeGoals;
};

const addDrawsHome = (homeGoals: number, awayGoals: number) => {
  team.totalPoints += 1;
  team.totalDraws += 1;
  team.goalsFavor += homeGoals;
  team.goalsOwn += awayGoals;
};

const addDrawsAway = (homeGoals: number, awayGoals: number) => {
  team.totalPoints += 1;
  team.totalDraws += 1;
  team.goalsFavor += awayGoals;
  team.goalsOwn += homeGoals;
};

const addLossesHome = (homeGoals: number, awayGoals: number) => {
  team.totalLosses += 1;
  team.goalsFavor += homeGoals;
  team.goalsOwn += awayGoals;
};

const addLossesAway = (homeGoals: number, awayGoals: number) => {
  team.totalLosses += 1;
  team.goalsFavor += awayGoals;
  team.goalsOwn += homeGoals;
};

const calculateEfficiency = (totalPoints: number, totalGames: number) => {
  const efficiency = (totalPoints / (totalGames * 3)) * 100;
  return Number(efficiency).toFixed(2);
};

const totalPointsHome = (matches: IMatch[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals > awayTeamGoals) addVicitoriesHome(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals === awayTeamGoals) addDrawsHome(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals < awayTeamGoals) addLossesHome(homeTeamGoals, awayTeamGoals);
  });
};

const totalPointsAway = (matches: IMatch[]) => {
  matches.forEach(({ homeTeamGoals, awayTeamGoals }) => {
    if (homeTeamGoals < awayTeamGoals) addVicitoriesAway(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals === awayTeamGoals) addDrawsAway(homeTeamGoals, awayTeamGoals);
    if (homeTeamGoals > awayTeamGoals) addLossesAway(homeTeamGoals, awayTeamGoals);
  });
};

const calculateHomeStatistics = (name: string, matches: IMatch[]) => {
  if (name === team.name) resetTeams();
  team.name = name;
  totalPointsHome(matches);
  team.totalGames += 1;
  team.goalsBalance = team.goalsFavor - team.goalsOwn;
  const efficiency = calculateEfficiency(team.totalPoints, team.totalGames);
  team.efficiency = Number(efficiency);
  return team;
};

const calculateAwayStatistics = (name: string, matches: IMatch[]) => {
  if (name === team.name) resetTeams();
  team.name = name;
  totalPointsAway(matches);
  team.totalGames += 1;
  team.goalsBalance = team.goalsFavor - team.goalsOwn;
  const efficiency = calculateEfficiency(team.totalPoints, team.totalGames);
  team.efficiency = Number(efficiency);
  return team;
};

export { calculateHomeStatistics, calculateAwayStatistics };
