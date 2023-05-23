import { Router, Request, Response } from 'express';
import MatchesController from '../controller/MatchesController';
import MatchesService from '../service/matchesService';
import TokenAuthorization from '../utils/TokenAuthorization';

const matchesRouter = Router();
const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

matchesRouter.get(
  '/matches',
  (req: Request, res: Response) => matchesController.getAllMatches(req, res),
);

matchesRouter.patch(
  '/matches/:id/finish',
  TokenAuthorization.verificationToken,
  (req: Request, res: Response) => matchesController.terminateMatch(req, res),
);

matchesRouter.patch(
  '/matches/:id',
  TokenAuthorization.verificationToken,
  (req: Request, res: Response) => matchesController.updateGoals(req, res),
);

matchesRouter.post(
  '/matches',
  TokenAuthorization.verificationToken,
  (req: Request, res: Response) => matchesController.createMatch(req, res),
);

export default matchesRouter;
