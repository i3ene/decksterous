import { NextFunction, Request, Response } from 'express';
import { User } from '../models/data/user.model';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Config } from '../config';

export namespace AuthMiddleware {
  export async function verifyUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    const user: User | null = await User.scope([]).findOne({
      where: {
        name: req.body.name,
      },
    } as any);
    if (user == null) return res.status(404).send({ message: 'Username not found!' });

    req.user = user;
    next();
  }

  export async function verifyPassword(req: Request, res: Response, next: NextFunction): Promise<any> {
    if (req.user == null) return res.status(500).send({ message: 'User object is null!' });

    var valid = bcrypt.compareSync(req.body.password, req.user.password);
    if (!valid) return res.status(401).send({ message: 'Password is incorrect!' });

    next();
  }

  export async function verifyToken(req: Request, res: Response, next: NextFunction): Promise<any> {
    var token = req.headers[Config.Auth.HEADER] as string;
    console.log(token);
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
  }

  export async function checkDuplicateName(req: Request, res: Response, next: NextFunction): Promise<any> {
    const user: User | null = await User.findOne({
      where: {
        name: req.body.name,
      },
    } as any);
    if (user != undefined) return res.status(404).send({ message: 'Username already exists!' });

    next();
  }

  export async function checkDuplicateMail(req: Request, res: Response, next: NextFunction): Promise<any> {
    const user: User | null = await User.findOne({
      where: {
        mail: req.body.mail,
      },
    } as any);
    if (user != undefined) return res.status(404).send({ message: 'Mail already exists!' });

    next();
  }

  export async function isAdmin(req: Request, res: Response, next: NextFunction): Promise<any> {
    if (req.user == null) return res.status(500).send({ message: 'User object is null!' });
    if (req.user.id != Config.Auth.ADMIN_ID) return res.status(401).send({ message: 'Restricted to Admin!' });

    next();
  }

  export function getSelf(key: string, scopes: any[] = []) {
    return async (req: Request, res: Response, next: NextFunction) => {
      if (req.user == null) return res.status(500).send({ message: 'User object is null!' });
      const user: User | null = await User.scope(['defaultScope'].concat(scopes)).findByPk(req.user.id);
      if (user == undefined) return res.status(500).send({ message: 'No User found for Token ID!' });
      req.data[key] = user;

      next();
    };
  }
}
