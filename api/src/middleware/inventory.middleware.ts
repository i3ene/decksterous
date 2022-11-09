import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";
import { Inventory } from "../models/data/inventory.model";
import { QueryUtil } from "../utils/query.util";

export namespace InventoryMiddleware {
  export async function getAll(req: Request, res: Response, next: NextFunction): Promise<any> {
    const inventories: Inventory[] = await Inventory.scope({method: ['query', req.query, Op.or]}).findAll();
    if (inventories.length == 0) req.data.messages.push('No Inventories found!');
    req.data.inventories = inventories;

    next();
  }

  export async function getPk(req: Request, res: Response, next: NextFunction): Promise<any> {
    const inventory: Inventory | null = await Inventory.findByPk(req.body.id ? req.body.id : req.query.id);
    if (inventory == null) req.data.messages.push('No Inventory found!');
    req.data.inventory = inventory;

    next();
  }

  export async function get(req: Request, res: Response, next: NextFunction): Promise<any> {
    const inventory: Inventory | null = await Inventory.scope(['items', 'user', {method: ['query', req.query, Op.and]}]).findOne();
    if (inventory == null) req.data.messages.push('No Inventory found!');
    req.data.inventory = inventory;

    next();
  }

  export async function add(req: Request, res: Response, next: NextFunction): Promise<any> {
    const inventory: Inventory = await Inventory.create(QueryUtil.attributes(req.body, Inventory));
    if (!inventory) req.data.messages.push('Something went wrong');
    else req.data.messages.push('Inventory successfully added!');
    req.data.inventory = inventory;

    next();
  }

  export async function edit(req: Request, res: Response, next: NextFunction): Promise<any> {
    if (req.data.inventory == undefined) return res.status(500).send("No Inventory data received!");
    req.data.inventory.update(QueryUtil.attributes(req.body, Inventory));
    req.data.messages.push("Inventory successfully edited!");

    next();
  }

  export async function remove(req: Request, res: Response, next: NextFunction): Promise<any> {
    if (req.data.inventory == undefined) return res.status(500).send("No Inventory data received!");
    await req.data.inventory.destroy();
    req.data.messages.push("Inventory successfully deleted!");

    next();
  }
}
