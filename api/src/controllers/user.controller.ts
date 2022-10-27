import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { User } from '../models/data/user.model';
import { QueryUtil } from '../utils/query.util';

export namespace UserController {
  export async function getAll(req: Request, res: Response): Promise<any> {
    const users: User[] = await User.scope({ method: ['query', req.query, Op.or] }).findAll();
    if (users.length == 0) return res.status(404).send({ message: 'No Users found!' });
    res.status(200).send(users);
  }

  export async function get(req: Request, res: Response): Promise<any> {
    const user: User | null = await User.scope({ method: ['query', req.query, Op.and] }).findOne();
    res.status(200).send(user);
  }

  export async function add(req: Request, res: Response): Promise<any> {
    const user: User = await User.create(QueryUtil.attributes(req.body, User));
    if (user) return res.status(200).send({ message: 'User successfully added!' });
    res.status(500).send({ message: 'Something went wrong' });
  }

  export async function edit(req: Request, res: Response): Promise<any> {
    const user: User | null = await User.scope({ method: ['query', req.query, Op.and] }).findOne();
    if (user == undefined) return res.status(404).send({ message: 'No User found!' });
    user.update(QueryUtil.attributes(req.body, User));
    res.status(200).send({ message: "User successfully edited!" });
  }

  export async function remove(req: Request, res: Response): Promise<any> {
    const user: User | null = await User.findByPk(req.body.id ? req.body.id : req.query.id);
    if (user == undefined) return res.status(404).send({ message: 'No User found!' });
    await user.destroy();
    res.status(200).send({ message: "User successfully deleted!"});
  }
}
