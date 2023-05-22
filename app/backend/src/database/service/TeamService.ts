import { ModelStatic } from 'sequelize';
import IServiceTeam from '../Interfaces/IServiceTeam';
import Team from '../models/Team';

export default class TeamService implements IServiceTeam {
  protected model: ModelStatic<Team> = Team;

  async findAllTeams(): Promise<Team[]> {
    return this.model.findAll();
  }

  async findTeamsById(id: number): Promise<Team> {
    return (await this.model.findByPk(id)) as Team;
  }
}
