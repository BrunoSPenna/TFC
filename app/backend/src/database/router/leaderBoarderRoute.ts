import * as express from 'express';
import Match from '../models/Matches';
import LeaderboardService from '../service/leaderBoardService';
import LeaderboardController from '../controller/leaderBoardController';
import Team from '../models/Team';

require('express-async-errors');

const leaderboard = new LeaderboardController(
  new LeaderboardService(Match, Team),
);
const leaderboardRouter = express.Router();

leaderboardRouter.get('/leaderboard/home', (req, res) =>
  leaderboard.homeTeamLeaderBoard(req, res));

export default leaderboardRouter;
