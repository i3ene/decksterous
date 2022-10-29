import {Request, Response} from 'express';
import {Op} from 'sequelize';
import {QueryUtil} from '../utils/query.util';
import {CardType} from "../models/data/cardType.model";


export namespace CardTypeController {
  export async function getAll(req: Request, res: Response): Promise<any> {
    const cardTypes: CardType[] = await CardType.scope({method: ['query', req.query, Op.or]}).findAll();
    if (cardTypes.length == 0) return res.status(404).send({
      message: 'No CardTypes found!'
    });
    res.status(200).send(cardTypes);
  }

  export async function get(req: Request, res: Response): Promise<any> {
    const cardType: CardType | null = await CardType.scope(['inventory', {method: ['query', req.query, Op.and]}]).findOne();
    res.status(200).send(cardType);
  }

  export async function add(req: Request, res: Response): Promise<any> {
    const cardType: CardType = await CardType.create(QueryUtil.attributes(req.body, CardType
    ));
    if (cardType) return res.status(200).send({
      message: 'CardType successfully added!'
    });
    res.status(500).send({message: 'Something went wrong'});
  }

  export async function edit(req: Request, res: Response): Promise<any> {
    const cardType: CardType | null = await CardType.scope({method: ['query', req.query, Op.and]}).findOne();
    if (cardType == undefined) return res.status(404).send({
      message: 'CardType not found!'
    });
    cardType.update(QueryUtil.attributes(req.body, CardType));
    res.status(200).send({
      message: "Edited cardType successfully!"
    });
  }

  export async function remove(req: Request, res: Response): Promise<any> {
    const cardType: CardType | null = await CardType.findByPk(req.body.id ? req.body.id : req.query.id);
    if (cardType == undefined) return res.status(404).send({
      message: 'CardType not found!'
    });
    await cardType.destroy();
    res.status(200).send({
      message: "Deleted cardType successfully!"
    });
  }
}
