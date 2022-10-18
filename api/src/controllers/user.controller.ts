import { Request, Response } from 'express';
import { User } from '../models/data/user.model';

export namespace UserController {
  export async function getAll(req: Request, res: Response): Promise<any> {
    const users: User[] = await User.findAll();
    if (users.length == 0)
      return res.status(404).send({ message: 'No Users found!' });
    res.status(200).send(users);
  }

  export async function add(req: Request, res: Response): Promise<any> {
    const user: User = await User.create({
      name: req.body.name,
      password: req.body.password,
      mail: req.body.mail,
    } as any);
    if (user)
      return res.status(200).send({ message: 'User successfully added!' });
    res.status(500).send({ message: 'Something went wrong' });
  }
}
