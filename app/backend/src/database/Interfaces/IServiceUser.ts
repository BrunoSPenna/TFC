import IToken from './IToken';
import IUsers from './IUsers';

export default interface IServiceUsers {
  create(email: string, password: string): Promise<IToken | null>
  getRole(email: string): Promise<IUsers | null>
}
