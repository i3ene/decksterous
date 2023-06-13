import {NextFunction, Request, Response} from 'express';
import {Op} from 'sequelize';
import {Config} from '../config';
import {Data} from '../models/object/data.express';
import {
  RequestDifference,
  RequestOptionsAssociation,
  RequestOptionsBody,
  RequestOptionsData,
  RequestOptionsList,
  RequestOptionsModel,
  RequestOptionsPage
} from '../models/object/request.model';
import {QueryUtil} from '../utils/query.util';
import {RequestUtils} from '../utils/request.util';
import { Handler } from '../utils/handler.util';

export namespace RequestMiddleware {
  export function handler(req: Request, res: Response, next: NextFunction) {
    req.data = new Data();
    next();
  }

  export function header(req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Headers', Config.Auth.HEADER + ', Origin, Content-Type, Accept');
    next();
  }

  export function find(options: RequestOptionsModel & RequestOptionsData) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const query = QueryUtil.isEmpty(req.body) ? req.query : req.body;
      const data = await options.model.scope(['defaultScope', {method: ['query', query, Op.and]}].concat(options.scopes ?? [])).findOne();
      if (data == null) req.data.addMessage('No ' + key + ' found!', 404);
      req.data[key] = data;

      next();
    });
  }

  export function findAll(options: RequestOptionsModel & RequestOptionsData & RequestOptionsPage) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const query = QueryUtil.isEmpty(req.body) ? req.query : req.body;
      let page: { offset: number, limit: number } = {} as any;
      if (options.page) {
        page.limit = options.page.size;
        page.offset = Number(RequestUtils.byAttribute(req.params, options.page.key));
        if (!QueryUtil.isZeroOrGreater(page.offset)) page.offset = Number(RequestUtils.byAttribute(req.body, options.page.key));
        if (!QueryUtil.isZeroOrGreater(page.offset)) page.offset = Number(RequestUtils.byAttribute(req.query, options.page.key));
        if (!QueryUtil.isZeroOrGreater(page.offset)) page.offset = 0;
        page.offset *= page.limit;
      }
      const data = await options.model.scope(['defaultScope', {method: ['query', query, Op.or, true]}].concat(options.scopes ?? [])).findAll(page);
      if (data == null) req.data.addMessage('No ' + key + ' found!', 404);
      req.data[key] = data;

      next();
    });
  }

  export function get(options: RequestOptionsModel & RequestOptionsData & RequestOptionsBody) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      let id: number | string = 0;
      if (options.body?.key) {
        id = RequestUtils.byAttribute(req.params, options.body.key);
        if (QueryUtil.isEmptyOrZero(id)) id = RequestUtils.byAttribute(req.body, options.body.key);
        if (QueryUtil.isEmptyOrZero(id)) id = RequestUtils.byAttribute(req.query, options.body.key);
      }
      if (QueryUtil.isEmptyOrZero(id)) {
        id = req.params.id;
        if (QueryUtil.isEmptyOrZero(id)) id = req.body.id;
        if (QueryUtil.isEmptyOrZero(id)) id = req.query.id as any;
      }
      const data = await options.model.scope(['defaultScope'].concat(options.scopes ?? [])).findByPk(id);
      if (data == null) req.data.addMessage('No ' + key + ' found!', 404);
      req.data[key] = data;

      next();
    });
  }

  export function getAll(options: RequestOptionsModel & RequestOptionsData & RequestOptionsList & RequestOptionsPage) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      let value: any = RequestUtils.byAttribute(req.body, options.list?.key);
      let ids: any[] = value ? value.map((x: any) => RequestUtils.byAttribute(x, options.list?.id)) : [];
      let page: { offset: number, limit: number } = {} as any;
      if (options.page) {
        page.limit = options.page.size;
        page.offset = Number(RequestUtils.byAttribute(req.params, options.page.key));
        if (!QueryUtil.isZeroOrGreater(page.offset)) page.offset = Number(RequestUtils.byAttribute(req.body, options.page.key));
        if (!QueryUtil.isZeroOrGreater(page.offset)) page.offset = Number(RequestUtils.byAttribute(req.query, options.page.key));
        if (!QueryUtil.isZeroOrGreater(page.offset)) page.offset = 0;
        page.offset *= page.limit;
      }
      const data = await options.model.scope(['defaultScope'].concat(options.scopes ?? [])).findAll(Object.assign(page, QueryUtil.ids(options.model, ids)));
      if (data == null) req.data.addMessage('No ' + key + ' found!', 404);
      req.data[key] = data;

      next();
    });
  }

  export function add(options: RequestOptionsModel & RequestOptionsData & RequestOptionsBody) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const payload = RequestUtils.byAttribute(req.body, options.body?.key);
      const data = await options.model.create(QueryUtil.attributes(payload, options.model));
      if (data == undefined) return res.status(500).send('Something went wrong');
      else req.data.addMessage(key + ' successfully added!', 200, data);
      req.data[key] = data;

      next();
    });
  }

  export function addOrFind(options: RequestOptionsModel & RequestOptionsData & RequestOptionsBody) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const payload = RequestUtils.byAttribute(req.body, options.body?.key);
      const [data, created] = await options.model.findOrCreate({ where: QueryUtil.attributes(payload, options.model) });
      if (data == undefined) return res.status(500).send('Something went wrong');
      else if (created) req.data.addMessage(key + ' successfully added!', 200, data);
      req.data[key] = data;

      next();
    });
  }

  export function edit(options: RequestOptionsModel & RequestOptionsData & RequestOptionsBody) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const data = RequestUtils.byAttribute(req.data, key);
      const payload = RequestUtils.byAttribute(req.body, options.body?.key);
      if (data == undefined) return res.status(500).send('No ' + key + ' data available!');
      const result = await data.update(QueryUtil.attributes(payload, options.model));
      req.data.addMessage(key + ' successfully edited!', 200, result);

      next();
    });
  }

  export function remove(options: RequestOptionsModel & RequestOptionsData) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const data = RequestUtils.byAttribute(req.data, key);
      if (data == undefined) return res.status(500).send('No ' + key + ' data available!');
      await data.destroy();
      req.data.addMessage(key + ' successfully deleted!', 200);

      next();
    });
  }

  export function getAssociation(options: RequestOptionsModel & RequestOptionsData & RequestOptionsAssociation & RequestOptionsPage) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      let page: { offset: number, limit: number } = {} as any;
      if (options.page) {
        page.limit = options.page.size;
        page.offset = Number(RequestUtils.byAttribute(req.params, options.page.key));
        if (!QueryUtil.isZeroOrGreater(page.offset)) page.offset = Number(RequestUtils.byAttribute(req.body, options.page.key));
        if (!QueryUtil.isZeroOrGreater(page.offset)) page.offset = Number(RequestUtils.byAttribute(req.query, options.page.key));
        if (!QueryUtil.isZeroOrGreater(page.offset)) page.offset = 0;
        page.offset *= page.limit;
      }
      const data = RequestUtils.byAttribute(req.data, key);
      if (data == undefined) return res.status(500).send('No ' + key + ' data available!');
      const scope = {scope: (options.scopes ?? [])[0]};
      const association = RequestUtils.byAttribute(req.data, key);
      association[options.association?.key ?? options.association?.name!] = await data.$get(options.association?.name, Object.assign(scope, page));

      next();
    });
  }

  export function setAssociation(options: RequestOptionsModel & RequestOptionsData & RequestOptionsAssociation) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const data = RequestUtils.byAttribute(req.data, key);
      if (data == undefined) return res.status(500).send('No ' + key + ' data available!');
      await data.$set(options.association?.name, RequestUtils.byAttribute(req.data, options.association?.data));
      req.data.addMessage(options.association?.name + ' successfully set for ' + key + '!', 200);

      next();
    });
  }

  export function addAssociation(options: RequestOptionsModel & RequestOptionsData & RequestOptionsAssociation) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const data = RequestUtils.byAttribute(req.data, key);
      if (data == undefined) return res.status(500).send('No ' + key + ' data available!');
      await data.$add(options.association?.name, RequestUtils.byAttribute(req.data, options.association?.data));
      req.data.addMessage(options.association?.name + ' successfully added for ' + key + '!', 200);

      next();
    });
  }

  export function removeAssociation(options: RequestOptionsModel & RequestOptionsData & RequestOptionsAssociation) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const data = RequestUtils.byAttribute(req.data, key);
      if (data == undefined) return res.status(500).send('No ' + key + ' data available!');
      await data.$remove(options.association?.name, RequestUtils.byAttribute(req.data, options.association?.data));
      req.data.addMessage(options.association?.name + ' successfully removed for ' + key + '!', 200);

      next();
    });
  }

  export function hasAssociation(options: RequestOptionsModel & RequestOptionsData & RequestOptionsAssociation) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key ?? options.model.name;
      const data = RequestUtils.byAttribute(req.data, key);
      if (data == undefined) return res.status(500).send('No ' + key + ' data available!');
      const association = RequestUtils.byAttribute(req.data, options.data?.name ?? options.model.name);
      association[options.association?.key ?? options.association?.name!] = await data.$has(options.association?.name, RequestUtils.byAttribute(req.data, options.association?.data));

      next();
    });
  }

  export function difference(type: RequestDifference, key1: any[] | any, key2: any[] | any, alias: string, on?: any[] | any) {
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

  export function check(value: any, equal: boolean, message: string, options: RequestOptionsData) {
    return (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key;
      const data = RequestUtils.byAttribute(req.data, key);
      if ((value == data) == equal) return res.status(400).send({message: message});

      next();
    }
  }

  export function map(keyAcces: any, keySave: any) {
    return (req: Request, res: Response, next: NextFunction) => {
      const data = RequestUtils.byAttribute(req.data, keyAcces);
      RequestUtils.toAttribute(req.data, keySave, data);      

      next();
    }
  }
}
