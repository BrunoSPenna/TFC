import { Request, Response } from 'express';
import LeaderboardService from '../service/leaderBoardService';

export default class MatchController {
  constructor(private _leaderboardService: LeaderboardService) {}

  async homeTeamLeaderBoard(
    _req: Request,
    res: Response,
  ): Promise<Response> {
    const leaderboard = await this._leaderboardService.homeTeamLeaderBoard();

    return res.status(200).json(leaderboard);
  }
}
