import { NextFunction, Request, Response } from "express";
import { RequestOptionsData } from "../models/object/request.model";
import { RequestUtils } from "../utils/request.util";
import { User } from "../models/data/user.model";

export namespace UserMiddleware {
  export function checkFriend(type: "invites" | "requests", options: RequestOptionsData & { other: string | string[] | any | any[] }) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const keySelf = options.data?.key;
      const dataSelf = RequestUtils.byAttribute(req.data, keySelf) as User;
      const keyOther = options.other;
      const dataOther = RequestUtils.byAttribute(req.data, keyOther) as User;
      if (dataSelf[type]?.some(x => x.id == dataOther.id)) return res.status(400).send({ message: `User already ${type == "invites" ? "invited" : "requested"}!` });

      next();
    }
  }
}