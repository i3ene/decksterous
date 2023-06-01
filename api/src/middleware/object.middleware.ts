import {NextFunction, Request, Response} from "express";
import {RequestOptionsData} from "../models/object/request.model";
import {RequestUtils} from "../utils/request.util";
import {_Object} from "../models/data/object.model";
import {Marketplace} from "../models/data/marketplace.model";

export namespace ObjectMiddleware {
  export function isOwn(equal: boolean, options: RequestOptionsData) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key;
      const data = RequestUtils.byAttribute(req.data, key) as _Object;
      if (data == undefined) return res.status(500).send('No ' + key + ' data available!');
      const result = await data.$get("inventory", {scope: "user"});
      if (result == undefined) return res.status(500).send('No inventory available!');
      if (result.user == undefined) return res.status(500).send('No user available!');
      if ((result.user.id == req.user?.id) != equal) return res.status(401).send({message: `${equal ? 'Is' : 'Not'} own object!`});

      next();
    }
  }

  export function sell(options: RequestOptionsData) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key;
      const data = RequestUtils.byAttribute(req.data, key) as _Object;
      const price = req.body.price ?? 0;
      const result = await Marketplace.create({objectHash: data.hash, price: price} as any);
      req.data.addMessage(key + ' successfully added!', 200, result);

      next();
    }
  }
}
