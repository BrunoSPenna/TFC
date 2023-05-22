// import { Model } from 'sequelize';
import { Request, Response } from 'express';
import ITeamService from '../Interfaces/IServiceTeam';

export default class TeamController {
  private _service: ITeamService;

  constructor(service: ITeamService) {
    this._service = service;
  }

  async findAllTeams(_req: Request, res: Response) {
    const result = await this._service.findAllTeams();
    return res.status(200).json(result);
  }

  async findTeamsById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this._service.findTeamsById(Number(id));
    return res.status(200).json(result);
  }
}
