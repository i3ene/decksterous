import { NextFunction, Request, Response } from 'express';

export namespace HeaderMiddleware {
  export function handler(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Headers', 'x-access-token, Origin, Content-Type, Accept');
    next();
  }
}
