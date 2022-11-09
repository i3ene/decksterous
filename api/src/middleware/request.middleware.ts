import { NextFunction, Request, Response } from 'express';
import { Config } from '../config';
import { QueryUtil } from '../utils/query.util';

export namespace RequestMiddleware {
  export function handler(req: Request, res: Response, next: NextFunction) {
    req.data = { messages: [] };
    next();
  }

  export function header(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Headers', Config.Auth.HEADER + ', Origin, Content-Type, Accept');
    next();
  }

  export function add(model: { new (...args: any[]): any } & any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const inventory: typeof model = await model.create(QueryUtil.attributes(req.body, typeof model));
      if (!inventory) req.data.messages.push('Something went wrong');
      else req.data.messages.push(typeof model + ' successfully added!');
      req.data.inventory = inventory;

      next();
    };
  }

  export function remove(key: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (req.data[key] == undefined) return res.status(500).send('No ' + key + ' data available!');
      await req.data[key].destroy();
      req.data.messages.push(key + ' successfully deleted!');

      next();
    };
  }
}
