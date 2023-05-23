import { NextFunction, Request, Response } from 'express';
import jwt = require('jsonwebtoken');

export default class TokenAuthorization {
  public static verificationToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const payload = jwt.verify(token, 'jwt_secret');
      req.body.role = payload;
      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
