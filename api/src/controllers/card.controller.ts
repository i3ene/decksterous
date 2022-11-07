import {Request, Response} from 'express';
import {Op} from 'sequelize';
import {QueryUtil} from '../utils/query.util';
import {Card} from "../models/data/card.model";
import { Item } from '../models/data/item.model';

export namespace CardController {
  export async function getAll(req: Request, res: Response): Promise<any> {
    const cards: Card[] = await Card.scope({method: ['query', req.query, Op.or]}).findAll();
    if (cards.length == 0) return res.status(404).send({message: 'No Cards found!'});
    res.status(200).send(cards);
  }

  export async function get(req: Request, res: Response): Promise<any> {
    const card: Card | null = await Card.scope(['item', {method: ['query', req.query, Op.and]}]).findOne();
    res.status(200).send(card);
  }

  export async function add(req: Request, res: Response): Promise<any> {
    if (req.body.itemId || req.body.item) {
      req.body.itemId = req.body.item ? req.body.item.id : req.body.itemId;
    } else {
      const item: Item = await Item.create(QueryUtil.attributes(req.body, Item));
      req.body.itemId = item.id;
    }

    const card: Card = await Card.create(QueryUtil.attributes(req.body, Card));
    if (card) return res.status(200).send({message: 'Card successfully added!'});
    res.status(500).send({message: 'Something went wrong'});
  }

  export async function edit(req: Request, res: Response): Promise<any> {
    const card: Card | null = await Card.scope({method: ['query', req.query, Op.and]}).findOne();
    if (card == undefined) return res.status(404).send({message: 'Card not found!'});
    card.update(QueryUtil.attributes(req.body, Card));
    res.status(200).send({message: "Edited card successfully!"});
  }

  export async function remove(req: Request, res: Response): Promise<any> {
    const card: Card | null = await Card.findByPk(req.body.id ? req.body.id : req.query.id);
    if (card == undefined) return res.status(404).send({message: 'Card not found!'});
    await card.destroy();
    res.status(200).send({message: "Deleted card successfully!"});
  }
}
