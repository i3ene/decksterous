import { NextFunction, Request, Response } from "express";
import { RequestOptionsData } from "../models/object/request.model";
import { RequestUtils } from "../utils/request.util";
import { User } from "../models/data/user.model";
import { Op } from "sequelize";
import { QueryUtil } from "../utils/query.util";
import { Marketplace } from "../models/data/marketplace.model";
import { _Object } from "../models/data/object.model";
import { Item } from "../models/data/item.model";
import { Inventory } from "../models/data/inventory.model";
import { Handler } from "../utils/handler.util";

export namespace UserMiddleware {
  export function checkFriend(type: "invites" | "requests", options: RequestOptionsData & { other: string | string[] | any | any[] }) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const keySelf = options.data?.key;
      const dataSelf = RequestUtils.byAttribute(req.data, keySelf) as User;
      const keyOther = options.other;
      const dataOther = RequestUtils.byAttribute(req.data, keyOther) as User;
      if (dataSelf[type]?.some(x => x.id == dataOther.id)) return res.status(400).send({ message: `User already ${type == "invites" ? "invited" : "requested"}!` });

      next();
    });
  }

  export function searchNewFriends(options: RequestOptionsData) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.name;
      const data = RequestUtils.byAttribute(req.data, options.data?.key) as User;
      const ids: number[] = [data.id];
      ids.push(...(data.friendAccepted?.map(x => x.id) ?? []));
      ids.push(...(data.friendInvites?.map(x => x.id) ?? []));
      ids.push(...(data.friendRequests?.map(x => x.id) ?? []));

      const query = QueryUtil.isEmpty(req.body) ? req.query : req.body;
      const search = await User.scope(['defaultScope', {method: ['query', query, Op.or, true]}]).findAll({
        where: {
          id: {
            [Op.notIn]: ids
          }
        }
      });
      if (search == null) req.data.addMessage('No ' + key + ' found!', 404);
      RequestUtils.toAttribute(req.data, key, search);

      next();
    });
  }

  export function getOtherMarketplaceObjects(options: RequestOptionsData) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.name ?? 'marketplace';
      const data = RequestUtils.byAttribute(req.data, options.data?.key) as User;

      const objects = await _Object.findAll({
        include: [Item, {
          model: Marketplace,
          required: true,
        }, {
          model: Inventory,
          required: true,
          include: [{
            model: User,
            required: true,
            where: {
              id: {
                [Op.not]: data.id
              }
            }
          }]
        }]
      });

      RequestUtils.toAttribute(req.data, key, objects);

      next();
    });
  }
}