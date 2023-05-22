import Team from '../models/Team';

export default interface IServiceTeam {
  findAllTeams(): Promise<Team[]>;
  findTeamsById(id: number): Promise<Team>;
}
