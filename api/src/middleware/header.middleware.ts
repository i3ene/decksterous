import { NextFunction, Request, Response } from 'express';
import { Config } from '../config';

export namespace HeaderMiddleware {
  export function handler(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Headers', Config.Auth.HEADER + ', Origin, Content-Type, Accept');
    next();
  }
}
