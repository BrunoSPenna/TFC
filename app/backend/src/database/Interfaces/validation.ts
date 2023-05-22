import { Request, Response, NextFunction } from 'express';

export default class validateLogin {
  public static validationFields(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: 'All fields must be filled' });
    }

    next();
  }
}
