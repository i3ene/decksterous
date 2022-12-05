import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import { Config } from '../config';
import { User } from '../models/data/user.model';
import { Data } from '../models/object/data.express';
import { RequestOptions } from '../models/object/request.model';
import { QueryUtil } from '../utils/query.util';
import { RequestUtils } from '../utils/request.util';

export namespace RequestMiddleware {
  export function handler(req: Request, res: Response, next: NextFunction) {
    req.data = new Data();
    next();
  }

  export function header(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Headers', Config.Auth.HEADER + ', Origin, Content-Type, Accept');
    next();
  }

  export function find(options: RequestOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const query = QueryUtil.isEmpty(req.body) ? req.body : req.query;
      const data = await options.model.scope(['defaultScope', { method: ['query', query, Op.and] }].concat(options.scopes ?? [])).findOne();
      if (data == null) req.data.addMessage('No ' + key + ' found!', 404);
      req.data[key] = data;

      next();
    };
  }

  export function findAll(options: RequestOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const query = QueryUtil.isEmpty(req.body) ? req.body : req.query;
      const data = await options.model.scope(['defaultScope', { method: ['query', query, Op.or, true] }].concat(options.scopes ?? [])).findAll();
      if (data == null) req.data.addMessage('No ' + key + ' found!', 404);
      req.data[key] = data;

      next();
    };
  }

  export function get(options: RequestOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      let id = 0;
      if (options.body?.key) {
        id = RequestUtils.byAttribute(req.body, options.body?.key);
        if (QueryUtil.isEmpty(id)) id = RequestUtils.byAttribute(req.query, options.body?.key);
      }
      if (QueryUtil.isEmpty(id)) {
        id = req.body.id;
        if (QueryUtil.isEmpty(id)) id = req.query.id as any;
      }
      console.log(id);
      const data = await options.model.scope(['defaultScope'].concat(options.scopes ?? [])).findByPk(id);
      if (data == null) req.data.addMessage('No ' + key + ' found!', 404);
      req.data[key] = data;

      next();
    };
  }

  export function getAll(options: RequestOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      let value: any = RequestUtils.byAttribute(req.body, options.list?.key);
      let ids: any[] = value ? value.map((x: any) => options.list?.id ? RequestUtils.byAttribute(x, options.list?.id) : x) : [];
      const data = await options.model.scope(['defaultScope'].concat(options.scopes ?? [])).findAll(QueryUtil.ids(options.model, ids));
      if (data == null) req.data.addMessage('No ' + key + ' found!', 404);
      req.data[key] = data;

      next();
    };
  }

  export function add(options: RequestOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const payload = RequestUtils.byAttribute(req.body, options.body?.key);
      const data = await options.model.create(QueryUtil.attributes(payload, options.model));
      if (data == undefined) return res.status(500).send('Something went wrong');
      else req.data.addMessage(key + ' successfully added!', 200, data);
      req.data[key] = data;

      next();
    };
  }

  export function edit(options: RequestOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const data = RequestUtils.byAttribute(req.data, options.data?.key ?? options.model.name);
      const payload = RequestUtils.byAttribute(req.body, options.body?.key);
      if (data == undefined) return res.status(500).send('No ' + key + ' data available!');
      const result = await data.update(QueryUtil.attributes(payload, options.model));
      req.data.addMessage(key + ' successfully edited!', 200, result);

      next();
    };
  }

  export function remove(options: RequestOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const data = RequestUtils.byAttribute(req.data, options.data?.key ?? options.model.name);
      if (data == undefined) return res.status(500).send('No ' + key + ' data available!');
      await data.destroy();
      req.data.addMessage(key + ' successfully deleted!', 200);

      next();
    };
  }

  export function getAssociation(options: RequestOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const data = RequestUtils.byAttribute(req.data, options.data?.key ?? options.model.name);
      if (data == undefined) return res.status(500).send('No ' + key + ' data available!');
      const association = RequestUtils.byAttribute(req.data, options.data?.name ?? options.model.name);
      association[options.association?.key ?? options.association?.name!] = await data.$get(options.association?.name);

      next();
    };
  }

  export function setAssociation(options: RequestOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const data = RequestUtils.byAttribute(req.data, options.data?.key ?? options.model.name);
      if (data == undefined) return res.status(500).send('No ' + key + ' data available!');
      await data.$set(options.association?.name,  RequestUtils.byAttribute(req.data, options.association?.data));
      req.data.addMessage(options.association?.name + ' successfully set for ' + key + '!', 200);

      next();
    };
  }

  export function addAssociation(options: RequestOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const data = RequestUtils.byAttribute(req.data, options.data?.key ?? options.model.name);
      if (data == undefined) return res.status(500).send('No ' + key + ' data available!');
      await data.$add(options.association?.name,  RequestUtils.byAttribute(req.data, options.association?.data));
      req.data.addMessage(options.association?.name + ' successfully added for ' + key + '!', 200);

      next();
    };
  }

  export function removeAssociation(options: RequestOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const data = RequestUtils.byAttribute(req.data, options.data?.key ?? options.model.name);
      if (data == undefined) return res.status(500).send('No ' + key + ' data available!');
      await data.$remove(options.association?.name,  RequestUtils.byAttribute(req.data, options.association?.data));
      req.data.addMessage(options.association?.name + ' successfully removed for ' + key + '!', 200);

      next();
    };
  }

  export function hasAssociation(options: RequestOptions) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const data = RequestUtils.byAttribute(req.data, options.data?.key ?? options.model.name);
      if (data == undefined) return res.status(500).send('No ' + key + ' data available!');
      const association = RequestUtils.byAttribute(req.data, options.data?.name ?? options.model.name);
      association[options.association?.key ?? options.association?.name!] = await data.$has(options.association?.name,  RequestUtils.byAttribute(req.data, options.association?.data));

      next();
    };
  }

  export function difference(type: 'left' | 'right' | 'intersection' | 'symmetric' , key1: any[] | any, key2: any[] | any, alias: string, on?: any[] | any) {
    return (req: Request, res: Response, next: NextFunction) => {
      let data1 = RequestUtils.byAttribute(req.data, key1);
      let data2 = RequestUtils.byAttribute(req.data, key2);
      if (Array.isArray(data1) && Array.isArray(data2)) {
        req.data[alias] = RequestUtils.difference(type, data1, data2, on);
      } else {
        req.data.addMessage("Difference only between arrays possible!", 400);
      }

      next();
    };
  }
}
