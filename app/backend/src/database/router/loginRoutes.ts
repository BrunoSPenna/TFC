import { Router, Request, Response } from 'express';
import UsersController from '../controller/loginController';
import UserService from '../service/loginService';
import validateLogin from '../Interfaces/validation';
import TokenAuthorization from '../utils/TokenAuth';

const loginRoute = Router();
const userService = new UserService();
const usersController = new UsersController(userService);

loginRoute.post(
  '/login',
  validateLogin.validationFields,
  (req: Request, res: Response) => usersController.create(req, res),
);

loginRoute.get(
  '/login/role',
  TokenAuthorization.verifyToken,
  (req: Request, res: Response) => usersController.getRole(req, res),
);
export default loginRoute;
