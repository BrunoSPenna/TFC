import { ModelStatic } from 'sequelize';
import Team from '../models/Team';
import IServicesMatches from '../Interfaces/IServiceMatches';
import Matches from '../models/Matches';
import IMatches from '../Interfaces/IMatches';

export default class MatchesService implements IServicesMatches {
  protected model: ModelStatic<Matches> = Matches;

  async getAllMatches(): Promise<IMatches[]> {
    return this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam' },
        { model: Team, as: 'awayTeam' },
      ],
    });
  }

  async terminateMatch(id: number) {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateGoals(id: number, homeTeamGoals: number, awayTeamGoals: number) {
    await this.model.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  async createMatch(matches: IMatches): Promise<IMatches> {
    const match = await this.model.create({ ...matches, inProgress: true });

    return match;
  }

  async readById(id: number): Promise<IMatches> {
    const result = await this.model.findOne({ where: { id } });
    return result as IMatches;
  }
}
