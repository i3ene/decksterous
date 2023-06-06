import {NextFunction, Request, Response} from "express";
import {RequestOptionsData} from "../models/object/request.model";
import {RequestUtils} from "../utils/request.util";
import {_Object} from "../models/data/object.model";
import {Marketplace} from "../models/data/marketplace.model";
import { User } from "../models/data/user.model";

export namespace ObjectMiddleware {
  export function isOwn(equal: boolean, options: RequestOptionsData) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key;
      const data = RequestUtils.byAttribute(req.data, key) as _Object;
      if (data == undefined) return res.status(500).send('No ' + key + ' data available!');
      const result = await data.$get("inventory", {scope: "user"});
      if (result == undefined) return res.status(500).send('No inventory available!');
      if (result.user == undefined) return res.status(500).send('No user available!');
      if ((result.user.id == req.user?.id) != equal) return res.status(401).send({message: `${data.hash} ${equal ? 'not' : 'is'} own object!`});

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

  export function buy(options: RequestOptionsData) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key;
      const data = RequestUtils.byAttribute(req.data, key) as Marketplace;

      if (req.user == undefined) return res.status(500).send({ message: "No Buyer data available!" });
      req.user = (await User.scope("inventory").findByPk(req.user.id))!;
      if (req.user?.inventory == undefined) return res.status(500).send({ message: "No Inventory available!" });
      if (req.user.coins < data.price) return res.status(400).send({ message: "Not enough coins to buy!" });
      data.object = (await data.$get("object", { scope: "user" }))!;
      if (data.object?.inventory?.user == undefined) return res.status(500).send({ message: "No Seller information available!" }); 

      await req.user.decrement("coins", { by: data.price });
      await data.object.inventory.user.increment("coins", { by: data.price });
      await data.object.$set("inventory", req.user.inventory);
      await data.destroy();

      next();
    }
  }
}
