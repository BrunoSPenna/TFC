import ITeam from '../Interfaces/ITeam';
import ILeaderBoard from '../Interfaces/ITable';
import Match from '../models/Matches';
import Team from '../models/Team';

export default class LeaderboardService {
  constructor(
    private _matchModel: typeof Match,
    private _teamModel: typeof Team,
  ) {}

  static homeTeam(id: number, matches: Match[]) {
    return matches.filter((match) => match.homeTeamId === id);
  }

  static awayTeam(id: number, matches: Match[]) {
    return matches.filter((match) => match.awayTeamId === id);
  }

  static countTotalPoints(victories: number, draws: number) {
    return victories * 3 + draws;
  }

  static countGames(id: number, matches: Match[]) {
    return matches.reduce((acc, curr) => {
      if (curr.homeTeamId === id) return acc + 1;
      if (curr.awayTeamId === id) return acc + 1;

      return acc;
    }, 0);
  }

  static countVictories(id: number, matches: Match[]) {
    return matches.reduce((acc, curr) => {
      if (curr.homeTeamId === id) {
        return curr.homeTeamGoals > curr.awayTeamGoals ? acc + 1 : acc;
      }
      if (curr.awayTeamId === id) {
        return curr.awayTeamGoals > curr.homeTeamGoals ? acc + 1 : acc;
      }

      return acc;
    }, 0);
  }

  static countDraws(id: number, matches: Match[]) {
    return matches.reduce((acc, curr) => {
      if (curr.homeTeamId === id) {
        return curr.homeTeamGoals === curr.awayTeamGoals ? acc + 1 : acc;
      }
      if (curr.awayTeamId === id) {
        return curr.awayTeamGoals === curr.homeTeamGoals ? acc + 1 : acc;
      }

      return acc;
    }, 0);
  }

  static countLosses(id: number, matches: Match[]) {
    return matches.reduce((acc, curr) => {
      if (curr.homeTeamId === id) {
        return curr.homeTeamGoals < curr.awayTeamGoals ? acc + 1 : acc;
      }
      if (curr.awayTeamId === id) {
        return curr.awayTeamGoals < curr.homeTeamGoals ? acc + 1 : acc;
      }

      return acc;
    }, 0);
  }

  static countGoalsFavor(id: number, matches: Match[]) {
    return matches.reduce((acc, curr) => {
      if (curr.homeTeamId === id) return acc + curr.homeTeamGoals;
      if (curr.awayTeamId === id) return acc + curr.awayTeamGoals;

      return acc;
    }, 0);
  }

  static countGoalsOwn(id: number, matches: Match[]) {
    return matches.reduce((acc, curr) => {
      if (curr.homeTeamId === id) return acc + curr.awayTeamGoals;
      if (curr.awayTeamId === id) return acc + curr.homeTeamGoals;

      return acc;
    }, 0);
  }

  static countGoalsMedia(goalsFavor: number, goalsOwn: number) {
    return goalsFavor - goalsOwn;
  }

  static efficiency(totalPoints: number, games: number) {
    return Number((totalPoints / (games * 3)) * 100).toFixed(2) || null;
  }

  static assembleLeaderboard(teams: ITeam[], matches: Match[]): ILeaderBoard[] {
    const result = teams.map(({ id, teamName: name }: ITeam) =>
      this.leaderboardTable(id, name, matches)) as ILeaderBoard[];

    return this.orderLeaderboard(result);
  }

  static leaderboardTable(id: number, name: string, matches: Match[]) {
    const victories = this.countVictories(id, matches);
    const draws = this.countDraws(id, matches);
    const games = this.countGames(id, matches);

    return {
      name,
      totalPoints: victories * 3 + draws,
      totalGames: games,
      totalVictories: victories,
      totalDraws: draws,
      totalLosses: this.countLosses(id, matches),
      goalsFavor: this.countGoalsFavor(id, matches),
      goalsOwn: this.countGoalsOwn(id, matches),
      goalsBalance: this.countGoalsMedia(
        this.countGoalsFavor(id, matches),
        this.countGoalsOwn(id, matches),
      ),
      efficiency: this.efficiency(victories * 3 + draws, games),
    };
  }

  static orderLeaderboard(leaderboard: ILeaderBoard[]) {
    return leaderboard.sort((a, b) => {
      if (a.totalPoints > b.totalPoints) return -1;
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalVictories > b.totalVictories) return -1;
      if (a.totalVictories < b.totalVictories) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;
      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;
      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsOwn > b.goalsOwn) return -1;
      if (a.goalsOwn < b.goalsOwn) return 1;

      return 0;
    });
  }

  async countMatches(): Promise<Match[]> {
    const matches = await this._matchModel.findAll({
      where: { inProgress: false },
    });

    return matches;
  }

  async countTeams() {
    const teams = await this._teamModel.findAll();

    return teams;
  }

  async homeTeamLeaderBoard() {
    const teams = await this.countTeams();
    const matches = await this.countMatches();
    const board = teams.map(({ id, teamName }) =>
      LeaderboardService.leaderboardTable(
        id,
        teamName,
        LeaderboardService.homeTeam(id, matches),
      )) as ILeaderBoard[];
    const sortedLeaderboard = LeaderboardService.orderLeaderboard(board);

    return sortedLeaderboard;
  }
}
