import { Request, Response } from 'express';
import { RequestUtils } from '../utils/request.util';

export namespace RequestController {
  export function result(key?: string | any[] | any) {
    return (req: Request, res: Response) => {
      let data = RequestUtils.byAttribute(req.data, key);
      res.status(200).send(data);
    };
  }

  export function message(index?: number | 'last') {
    return (req: Request, res: Response) => {
      let result = req.data.messages;
      if (index && req.data.messages.length) {
        if (typeof index == 'number') {
          if (index < 0) index = (req.data.messages.length + index) as number;
          if (index < 0) index = 0;
          result = req.data.messages[index];
        } else {
          result = req.data.messages[req.data.messages.length - 1];
        }
      }

      res.status(200).send(result);
    };
  }
}
