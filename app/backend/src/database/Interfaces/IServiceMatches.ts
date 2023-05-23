import IMatches from './IMatches';

export default interface IServiceTeam {
  getAllMatches(): Promise<IMatches[]>;
  terminateMatch(id: number): Promise<void>;
  updateGoals(id: number, homeTeamGoals: number, awayTeamGoals: number): Promise<void>;
  createMatch(matches: IMatches): Promise<IMatches>;
  readById(id: number): Promise<IMatches>;
}
