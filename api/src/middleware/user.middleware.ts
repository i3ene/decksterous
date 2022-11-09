import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import { User } from "../models/data/user.model";
import { QueryUtil } from "../utils/query.util";

export namespace UserMiddleware {
  export async function getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
    const users: User[] = await User.scope({ method: ['query', req.query, Op.or] }).findAll();
    if (users.length == 0) req.data.messages.push('No Users found!');
    req.data.users = users;

    next();
  }

  export async function getPk(req: Request, res: Response, next: NextFunction): Promise<any> {
    const user: User | null = await User.findByPk(req.body.id ? req.body.id : req.query.id);
    if (user == null) req.data.messages.push('No User found!');
    req.data.user = user;

    next();
  }

  export async function get(req: Request, res: Response, next: NextFunction): Promise<any> {
    const user: User | null = await User.scope(['inventory', 'friend', { method: ['query', req.query, Op.and] }]).findOne();
    if (user == null) req.data.messages.push('No User found!');
    req.data.user = user;

    next();
  }

  export async function add(req: Request, res: Response, next: NextFunction): Promise<any> {
    const user: User = await User.create(QueryUtil.attributes(req.body, User));
    if (!user) req.data.messages.push('Something went wrong');
    else req.data.messages.push('User successfully added!');
    req.data.user = user;

    next();
  }

  export async function edit(req: Request, res: Response, next: NextFunction): Promise<any> {
    if (req.data.user == undefined) return res.status(500).send("No User data received!");
    req.data.user.update(QueryUtil.attributes(req.body, User));
    req.data.messages.push("User successfully edited!");

    next();
  }

  export async function remove(req: Request, res: Response, next: NextFunction): Promise<any> {
    if (req.data.user == undefined) return res.status(500).send("No User data received!");
    await req.data.user.destroy();
    req.data.messages.push("User successfully deleted!");

    next();
  }
}
