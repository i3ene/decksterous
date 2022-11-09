import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
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

  export function find(model: { new (...args: any[]): any } & any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = model as string;
      const data = await model.scope([{ method: ['query', req.query, Op.and] }]).findOne();
      if (data == null) req.data.messages.push('No ' + key + ' found!');
      req.data[key] = data;

      next();
    };
  }

  export function findAll(model: { new (...args: any[]): any } & any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = model as string;
      const data = await model.scope([{ method: ['query', req.query, Op.or] }]).findAll();
      if (data == null) req.data.messages.push('No ' + key + ' found!');
      req.data[key] = data;

      next();
    };
  }

  export function get(model: { new (...args: any[]): any } & any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = model as string;
      const data = await model.findByPk(req.body.id ? req.body.id : req.query.id);
      if (data == null) req.data.messages.push('No ' + key + ' found!');
      req.data[key] = data;

      next();
    };
  }

  export function add(model: { new (...args: any[]): any } & any) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = model as string;
      const data = await model.create(QueryUtil.attributes(req.body, model));
      if (!data) req.data.messages.push('Something went wrong');
      else req.data.messages.push(key + ' successfully added!');
      req.data[key] = data;

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
