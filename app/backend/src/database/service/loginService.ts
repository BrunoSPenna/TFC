import { ModelStatic } from 'sequelize';
import bcrypt = require('bcryptjs');
import IServiceUser from '../Interfaces/IServiceUser';
import Users from '../models/Users';
import IToken from '../Interfaces/IToken';
import TokenManager from '../utils/validateLogin';
import IUsers from '../Interfaces/IUsers';

export default class loginService implements IServiceUser {
  protected model: ModelStatic<Users> = Users;
  private _jwt: TokenManager = new TokenManager();

  static validatePassword(password: string, user: IUsers) {
    const passwordResult = bcrypt.compareSync(password, user.password);

    if (!passwordResult || password.length < 6) {
      return null;
    }

    return passwordResult;
  }

  async create(email: string, password: string): Promise<IToken | null> {
    const regex = /^\S+@\S+\.\S+$/;

    const emailResult = await this.model.findOne({
      where: { email },
    });

    if (!emailResult || !regex.test(email)) {
      return null;
    }

    const setPassword = loginService.validatePassword(password, emailResult);

    if (!setPassword) {
      return null;
    }

    const token = this._jwt.tokenCreation({ email });

    return { token };
  }

  async getRole(email: string): Promise<IUsers | null> {
    const role = await this.model.findOne({ where: { email } });
    return role;
  }
}
