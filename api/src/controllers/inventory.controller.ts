import { Request, Response } from "express";
import { Op } from "sequelize";
import { Inventory } from "../models/data/inventory.model";
import { QueryUtil } from "../utils/query.util";

export namespace InventoryController {
  export async function getAll(req: Request, res: Response): Promise<any> {
    const inventories: Inventory[] = await Inventory.scope({method: ['query', req.query, Op.or]}).findAll();
    if (inventories.length == 0) return res.status(404).send({message: 'No Inventories found!'});
    res.status(200).send(inventories);
  }

  export async function get(req: Request, res: Response): Promise<any> {
    const inventory: Inventory | null = await Inventory.scope(['items', 'user', {method: ['query', req.query, Op.and]}]).findOne();
    res.status(200).send(inventory);
  }

  export async function add(req: Request, res: Response): Promise<any> {
    const inventory: Inventory = await Inventory.create(QueryUtil.attributes(req.body, Inventory));
    if (inventory) return res.status(200).send({message: 'Inventory successfully added!'});
    res.status(500).send({message: 'Something went wrong'});
  }

  export async function edit(req: Request, res: Response): Promise<any> {
    const inventory: Inventory | null = await Inventory.scope({method: ['query', req.query, Op.and]}).findOne();
    if (inventory == undefined) return res.status(404).send({message: 'Inventory not found!'});
    inventory.update(QueryUtil.attributes(req.body, Inventory));
    res.status(200).send({message: "Edited inventory successfully!"});
  }

  export async function remove(req: Request, res: Response): Promise<any> {
    const inventory: Inventory | null = await Inventory.findByPk(req.body.id ? req.body.id : req.query.id);
    if (inventory == undefined) return res.status(404).send({message: 'Inventory not found!'});
    await inventory.destroy();
    res.status(200).send({message: "Deleted inventory successfully!"});
  }
}
