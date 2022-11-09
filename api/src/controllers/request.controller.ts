import { Request, Response } from 'express';

export namespace RequestController {
  export function result(key?: string | any) {
    return (req: Request, res: Response) => {
      let data = req.data;
      if (key) {
        if (typeof key == 'string') {
          data = req.data[key];
        } else {
          data = req.data[key as string];
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
