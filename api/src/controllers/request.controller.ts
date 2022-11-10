import { Request, Response } from 'express';

export namespace RequestController {
  export function result(key?: string | any[] | any) {
    return (req: Request, res: Response) => {
      let data = req.data;
      if (key) {
        if (typeof key == 'string') {
          data = req.data[key];
        } else if (Array.isArray(key)) {
          data = req.data;
          for (const attr of key) {
            if (typeof key == 'string') {
              data = data[attr];
            } else {
              data = data[attr.name];
            }
          }
        } else {
          data = req.data[key.name];
        }
      }
      res.status(200).send(data);
    };
  }

  export function message(index?: number | 'last') {
    return (req: Request, res: Response) => {
      let result = req.data.messages;
      if (index && req.data.messages.length) {
        if (typeof index == 'number') {
          result = req.data.messages[index];
        } else {
          result = req.data.messages[req.data.messages.length - 1];
        }
      }

      res.status(200).send(result);
    };
  }
}
