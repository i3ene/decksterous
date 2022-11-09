import { Request, Response } from 'express';

export namespace RequestController {
  export function result(key?: string) {
    return (req: Request, res: Response) => {
      res.status(200).send(key ? req.data[key] : req.data);
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
