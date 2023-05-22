import * as jwt from 'jsonwebtoken';
import ILogin from '../Interfaces/ILogin';

class TokenCreator {
  private secret = process.env.JWT_SECTRET || 'jwt_secret';

  tokenCreation(payload: ILogin): string {
    const token = jwt.sign(payload, this.secret);
    return token;
  }

  authorizationToken(token: string): ILogin {
    const payload = jwt.verify(token, this.secret) as ILogin;
    return payload;
  }
}

export default TokenCreator;
