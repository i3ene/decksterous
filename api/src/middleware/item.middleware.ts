import { NextFunction, Request, Response } from "express";
import { RequestUtils } from "../utils/request.util";
import { Deck } from "../models/data/deck.model";
import { _Object } from "../models/data/object.model";
import { RequestOptionsData } from "../models/object/request.model";
import { Item } from "../models/data/item.model";
import { SubInventory } from "../models/data/subInventory.model";
import { Handler } from "../utils/handler.util";
import { Inventory } from "../models/data/inventory.model";
import { Op } from "sequelize";
import { Config } from "../config";

export namespace ItemMiddleware {
  export function createItemObject(options: RequestOptionsData) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.name;
      const data = RequestUtils.byAttribute(req.data, options.data?.key) as Item;

      const obj = await _Object.create({
        itemId: data.id
      } as any);
      RequestUtils.toAttribute(req.data, key, obj);

      next();
    });
  }

  export function createObjectSubInventory(options: RequestOptionsData) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.name;
      const data = RequestUtils.byAttribute(req.data, options.data?.key) as _Object;

      const check = await data.$get("subInventory");
      if (check) return res.status(500).send({ message: "Object already has SubInventory!" });

      const obj = await SubInventory.create({
        objectHash: data.hash
      } as any);
      RequestUtils.toAttribute(req.data, key, obj);

      next();
    });
  }

  export function checkSameInventory(options: RequestOptionsData & { other: any }) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const keySelf = options.data?.key;
      const dataSelf = RequestUtils.byAttribute(req.data, keySelf) as _Object;
      const keyOther = options.other;
      const dataOther = RequestUtils.byAttribute(req.data, keyOther) as _Object;

      if (dataSelf.inventoryId != dataOther.inventoryId) return res.status(400).send({ message: "Objects do not belong to the same inventory!" });

      next();
    });
  }

  export function addDefaultItems(options: RequestOptionsData) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key;
      const data = RequestUtils.byAttribute(req.data, key) as Inventory;
      const objects = await _Object.bulkCreate(Config.User.DEFAULT_ITEMS.map(x => ({ itemId: x })) as any[]);

      data.$add("objects", objects);

      next();
    });
  }
}