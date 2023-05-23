export default interface IMatches {
  id?: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  homeTeamId: number;
  inProgress: boolean;
  homeTeam?: {
    teamName: string;
  };
  awayTeam?: {
    teamName: string;
  };
  wins?: number;
}
