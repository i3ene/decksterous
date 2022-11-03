import { Request, Response } from 'express';
import { Op } from 'sequelize';
import { Inventory } from '../models/data/inventory.model';
import { User } from '../models/data/user.model';
import { QueryUtil } from '../utils/query.util';

export namespace UserController {
  export const Friend = UserFriendController;
  export const Inventory = UserInventoryController;

  export async function getAll(req: Request, res: Response): Promise<any> {
    const users: User[] = await User.scope({ method: ['query', req.query, Op.or] }).findAll();
    if (users.length == 0) return res.status(404).send({ message: 'No Users found!' });
    res.status(200).send(users);
  }

  export async function get(req: Request, res: Response): Promise<any> {
    const user: User | null = await User.scope(['inventory', 'friend', { method: ['query', req.query, Op.and] }]).findOne();
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

export namespace UserFriendController {
  export async function get(req: Request, res: Response): Promise<any> {
    const id = req.user ? req.user.id : req.query.id;

    const user: User | null = await User.scope(['friend']).findByPk(id as any);
    if (user == undefined) return res.status(404).send({ message: 'No User found!' });

    const friends: User[] = await user.$get('friends');

    res.status(200).send(friends);
  }

  export async function add(req: Request, res: Response): Promise<any> {
    const user: User | null = await User.findByPk(req.body.id);
    if (user == undefined) return res.status(404).send({ message: 'No User found!' });

    if (req.body.id == req.body.friend.id) return res.status(400).send({ message: 'Cannot add yourself!' });

    const friend: User | null = await User.findByPk(req.body.friend.id);
    if (friend == undefined) return res.status(404).send({ message: 'No Friend found!' });

    await user.$add('friends', friend);
    res.status(200).send({ message: "Friend successfully added!"});
  }

  export async function remove(req: Request, res: Response): Promise<any> {
    const user: User | null = await User.findByPk(req.body.id);
    if (user == undefined) return res.status(404).send({ message: 'No User found!' });

    if (req.body.id == req.body.friend.id) return res.status(400).send({ message: 'Cannot remove yourself!' });

    const friend: User | null = await User.findByPk(req.body.friend.id);
    if (friend == undefined) return res.status(404).send({ message: 'No Friend found!' });

    await user.$remove('friends', friend);
    res.status(200).send({ message: "Friend successfully removed!"});
  }
}

export namespace UserInventoryController {
  export async function get(req: Request, res: Response): Promise<any> {
    const id = req.user ? req.user.id : req.query.id;

    const user: User | null = await User.scope(['inventory']).findByPk(id as any);
    if (user == undefined) return res.status(404).send({ message: 'No User found!' });

    const inventory: Inventory | null = await user.$get('inventory');

    res.status(200).send(inventory);
  }

  export async function set(req: Request, res: Response): Promise<any> {
    const user: User | null = await User.findByPk(req.body.id);
    if (user == undefined) return res.status(404).send({ message: 'No User found!' });

    const inventory: Inventory | null = await Inventory.findByPk(req.body.inventory.id);
    if (inventory == undefined) return res.status(404).send({ message: 'No Inventory found!' });

    await user.$set('inventory', inventory);
    res.status(200).send({ message: "Inventory successfully set!"});
  }

  export async function remove(req: Request, res: Response): Promise<any> {
    const user: User | null = await User.findByPk(req.body.id);
    if (user == undefined) return res.status(404).send({ message: 'No User found!' });

    const inventory: Inventory | null = await Inventory.findByPk(req.body.inventory.id);
    if (inventory == undefined) return res.status(404).send({ message: 'No Inventory found!' });

    await user.$remove('inventory', inventory);
    res.status(200).send({ message: "Inventory successfully removed!"});
  }
}