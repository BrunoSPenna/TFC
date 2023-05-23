import { Request, Response } from 'express';
import IServiceMatches from '../Interfaces/IServiceMatches';

class MatchesController {
  private _service: IServiceMatches;
  constructor(service: IServiceMatches) {
    this._service = service;
  }

  async getAllMatches(req: Request, res: Response) {
    const result = await this._service.getAllMatches();

    if (req.query.inProgress) {
      const findByQuery = result.filter((param) =>
        param.inProgress.toString() === req.query.inProgress);
      return res.status(200).json(findByQuery);
    }
    return res.status(200).json(result);
  }

  async terminateMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.terminateMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  }

  async updateGoals(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._service.updateGoals(Number(id), homeTeamGoals, awayTeamGoals);

    return res.status(200).json({ message: 'Match has been updated' });
  }

  async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, awayTeamGoals, homeTeamGoals, inProgress } = req.body;

    const home = await this._service.readById(homeTeamId);
    const away = await this._service.readById(awayTeamId);

    if (!home || !away) {
      return res.status(404)
        .json({ message: 'There is no team with such id!' });
    }

    if (homeTeamId === awayTeamId) {
      return res.status(422)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }

    const create = await this._service.createMatch({
      homeTeamGoals, awayTeamId, awayTeamGoals, homeTeamId, inProgress });

    return res.status(201).json(create);
  }
}

export default MatchesController;
