import { NextFunction, Request, Response } from 'express';
import { User } from '../models/data/user.model';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Config } from '../config';
import { Validation } from '../models/data/validation.model';
import { ValidationType } from '../models/object/validation.object';
import { RequestUtils } from '../utils/request.util';
import { RequestOptionsData } from '../models/object/request.model';
import { Handler } from '../utils/handler.util';

export namespace AuthMiddleware {
  export function verifyUser(req: Request, res: Response, next: NextFunction) {
    return Handler.Async(async () => {
      const user: User | null = await User.scope([]).findOne({
        where: {
          name: req.body.name,
        },
      } as any);
      if (user == null) return res.status(404).send({ message: 'Username not found!' });

      req.user = user;
      next();
    })(req, res, next);
  }

  export function verifyPassword(req: Request, res: Response, next: NextFunction) {
    return Handler.Async(async () => {
      if (req.user == null) return res.status(500).send({ message: 'User object is null!' });

      var valid = bcrypt.compareSync(req.body.password, req.user.password);
      if (!valid) return res.status(401).send({ message: 'Password is incorrect!' });

      next();
    })(req, res, next);
  }

  export function verifyToken(req: Request, res: Response, next: NextFunction) {
    return Handler.Async(async () => {
      var token = req.headers[Config.Auth.HEADER] as string;
      if (token == null) return res.status(401).send({ message: 'No token provided!' });

      jwt.verify(token, Config.Auth.SECRET, (err: any, decoded: any) => {
        req.user = decoded;
        if (err == null) return next();
        if (err instanceof jwt.TokenExpiredError) {
          return res.status(401).send({ message: 'Token expired!' });
        } else {
          return res.status(401).send({ message: 'Token invalid!' });
        }
      });
    })(req, res, next);
  }

  export function checkDuplicateName(req: Request, res: Response, next: NextFunction) {
    return Handler.Async(async () => {
      if (!req.body.name) next();

      const user: User | null = await User.findOne({
        where: {
          name: req.body.name,
        },
      } as any);
      if (user != undefined) return res.status(404).send({ message: 'Username already exists!' });

      next();
    })(req, res, next);
  }

  export function checkDuplicateMail(req: Request, res: Response, next: NextFunction) {
    return Handler.Async(async () => {
      if (!req.body.mail) return res.status(400).send({ message: 'No mail specified!' });

      const user: User | null = await User.findOne({
        where: {
          mail: req.body.mail,
        },
      } as any);
      if (user != undefined) return res.status(404).send({ message: 'Mail already exists!' });

      next();
    })(req, res, next);
  }

  export function checkPassword(req: Request, res: Response, next: NextFunction): any {
    if (!req.body.password) return res.status(400).send({ message: 'No password set!' });

    next();
  }

  export function isAdmin(req: Request, res: Response, next: NextFunction) {
    return Handler.Async(async () => {
      if (req.user == null) return res.status(500).send({ message: 'User object is null!' });
      if (req.user.id != Config.Auth.ADMIN_ID) return res.status(401).send({ message: 'Restricted to Admin!' });

      next();
    })(req, res, next);
  }

  export function getSelf(key: string | any, scopes: any[] = []) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      if (req.user == null) return res.status(500).send({ message: 'User object is null!' });
      const user: User | null = await User.scope(['defaultScope'].concat(scopes)).findByPk(req.user.id);
      if (user == undefined) return res.status(500).send({ message: 'No User found for Token ID!' });
      if (typeof key != "string") key = key.name;
      req.data[key] = user;

      next();
    });
  }
}

export namespace AuthMiddleware {
  export function setValidation(type: ValidationType) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      req.body.type = type;

      next();
    });
  }

  export function checkValidation(options: RequestOptionsData) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key;
      const data = RequestUtils.byAttribute(req.data, key) as Validation;
      req.body.mail = data.mail;

      next();
    });
  }

  export function updatePassword(options: RequestOptionsData) {
    return Handler.Async(async (req: Request, res: Response, next: NextFunction) => {
      const key = options.data?.key;
      const data = RequestUtils.byAttribute(req.data, key) as Validation;

      const user = await User.findOne({ where: { mail: data.mail } });
      if (!user) return res.status(500).send({ message: `No User found to mail ${data.mail}!` });
      await user.update({ password: req.body.password });
      req.data.addMessage("Password updated!", 200)

      next();
    });
  }
}