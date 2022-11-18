import { NextFunction, Request, Response } from 'express';
import { Op } from 'sequelize';
import { Config } from '../config';
import { User } from '../models/data/user.model';
import { Data } from '../models/object/data.express';
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

  export function find(model: { new (...args: any[]): any } & any, scopes: any[] = [], alias?: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = alias ? alias : model.name;
      const query = Object.keys(req.body).length ? req.body : req.query;
      const data = await model.scope(['defaultScope', { method: ['query', query, Op.and] }].concat(scopes)).findOne();
      if (data == null) req.data.addMessage('No ' + key + ' found!', 404);
      req.data[key] = data;

      next();
    };
  }

  export function findAll(model: { new (...args: any[]): any } & any, scopes: any[] = [], alias?: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = alias ? alias : model.name;
      const query = Object.keys(req.body).length ? req.body : req.query;
      const data = await model.scope(['defaultScope', { method: ['query', query, Op.or, true] }].concat(scopes)).findAll();
      if (data == null) req.data.addMessage('No ' + key + ' found!', 404);
      req.data[key] = data;

      next();
    };
  }

  export function get(model: { new (...args: any[]): any } & any, scopes: any[] = [], alias?: string, idKey?: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = alias ? alias : model.name;
      let id = 0;
      if (idKey) id = req.body[idKey] ?? req.query[idKey];
      else id = req.body.id ? req.body.id : req.query.id;
      const data = await model.scope(['defaultScope'].concat(scopes)).findByPk(id);
      if (data == null) req.data.addMessage('No ' + key + ' found!', 404);
      req.data[key] = data;

      next();
    };
  }

  export function getAll(model: { new (...args: any[]): any } & any, scopes: any[] = [], arrKey: string, alias?: string, idKey?: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = alias ? alias : model.name;
      let ids = req.body[arrKey] ? req.body[arrKey].map((x: any) => idKey ? x[idKey]: x) : [];
      const data = await model.scope(['defaultScope'].concat(scopes)).findAll(QueryUtil.ids(model, ids));
      if (data == null) req.data.addMessage('No ' + key + ' found!', 404);
      req.data[key] = data;

      next();
    };
  }

  export function add(model: { new (...args: any[]): any } & any, alias?: string, payloadKey?: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = alias ? alias : model.name;
      const payload = payloadKey ? req.body[payloadKey] : req.body;
      const data = await model.create(QueryUtil.attributes(payload, model));
      if (data == undefined) return res.status(500).send('Something went wrong');
      else req.data.addMessage(key + ' successfully added!', 200, data);
      req.data[key] = data;

      next();
    };
  }

  export function edit(model: { new (...args: any[]): any } & any, alias?: string, payloadKey?: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = alias ? alias : model.name;
      const payload = payloadKey ? req.body[payloadKey] : req.body;
      if (req.data[key] == undefined) return res.status(500).send('No ' + key + ' data available!');
      const data = await req.data[key].update(QueryUtil.attributes(payload, model));
      req.data.addMessage(key + ' successfully edited!', 200, data);

      next();
    };
  }

  export function remove(model: { new (...args: any[]): any } & any, alias?: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = alias ? alias : model.name;
      if (req.data[key] == undefined) return res.status(500).send('No ' + key + ' data available!');
      await req.data[key].destroy();
      req.data.addMessage(key + ' successfully deleted!', 200);

      next();
    };
  }



  export function getAssociation(model: { new (...args: any[]): any } & any, association: string, alias?: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = alias ? alias : model.name;
      if (req.data[key] == undefined) return res.status(500).send('No ' + key + ' data available!');
      req.data[key][association] = await req.data[key].$get(association);

      next();
    };
  }

  export function setAssociation(model: { new (...args: any[]): any } & any, association: string, data: any | any[], alias?: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = alias ? alias : model.name;
      if (req.data[key] == undefined) return res.status(500).send('No ' + key + ' data available!');
      await req.data[key].$set(association,  RequestUtils.byAttribute(req.data, data));
      req.data.addMessage(association + ' successfully set for ' + key + '!', 200);

      next();
    };
  }

  export function addAssociation(model: { new (...args: any[]): any } & any, association: string, data: any | any[], alias?: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = alias ? alias : model.name;
      if (req.data[key] == undefined) return res.status(500).send('No ' + key + ' data available!');
      await req.data[key].$add(association,  RequestUtils.byAttribute(req.data, data));
      req.data.addMessage(association + ' successfully added for ' + key + '!', 200);

      next();
    };
  }

  export function removeAssociation(model: { new (...args: any[]): any } & any, association: string, data: any | any[], alias?: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = alias ? alias : model.name;
      if (req.data[key] == undefined) return res.status(500).send('No ' + key + ' data available!');
      await req.data[key].$remove(association,  RequestUtils.byAttribute(req.data, data));
      req.data.addMessage(association + ' successfully removed for ' + key + '!', 200);

      next();
    };
  }

  export function hasAssociation(model: { new (...args: any[]): any } & any, association: string, data: any | any[], alias?: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = alias ? alias : model.name;
      if (req.data[key] == undefined) return res.status(500).send('No ' + key + ' data available!');
      req.data[key][association] = await req.data[key].$has(association,  RequestUtils.byAttribute(req.data, data));

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
