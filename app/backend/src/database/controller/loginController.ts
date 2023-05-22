// import { Model } from 'sequelize';
import { Request, Response } from 'express';
import IServiceUser from '../Interfaces/IServiceUser';

export default class loginController {
  private _service: IServiceUser;

  constructor(service: IServiceUser) {
    this._service = service;
  }

  async create(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await this._service.create(email, password);
    if (!result) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return res.status(200).json(result);
  }

  async getRole(req: Request, res: Response) {
    const { role } = req.body;
    const result = await this._service.getRole(role.email);
    return res.status(200).json({ role: result?.role });
  }
}
