import { Router } from 'express';

import { AuthMiddleware as auth } from '../middleware/auth.middleware';
import { RequestMiddleware as middleware } from '../middleware/request.middleware';
import { RequestController as controller } from '../controllers/request.controller';
import { Card } from '../models/data/card.model';
import { CardTypeRoutes } from './cardType.routes';
import { CardDeckRoutes } from './cardDeck.routes';
import { CardAbilityRoutes } from './cardAbility.routes';
import { Item } from '../models/data/item.model';
import { CardAbility } from '../models/data/cardAbility.model';

export const CardRoutes = Router();

CardRoutes.get('/all', [middleware.findAll({ model: Card, scopes: ['item', 'abilities']})], controller.result(Card));

CardRoutes.get('/', [middleware.find({ model: Card, scopes: ['item', 'abilities']})], controller.result(Card));

CardRoutes.post('/', [auth.isAdmin, middleware.add({ model: Card}), middleware.getAll({ model: CardAbility, list: { key: 'abilities', id: 'id'}}), middleware.setAssociation({ model: Card, association: { name: "abilities", data: CardAbility}})], controller.message('success'));

CardRoutes.put('/', [auth.isAdmin, middleware.get({ model: Card}), middleware.edit({ model: Card}), middleware.getAll({ model: CardAbility, list: { key: 'abilities', id: 'id'}}), middleware.setAssociation({ model: Card, association: { name: "abilities", data: CardAbility}})], controller.message('success'));

CardRoutes.delete('/', [auth.isAdmin, middleware.get({ model: Card}), middleware.remove({ model: Card})], controller.message('last'));

CardRoutes.use('/type', CardTypeRoutes);

CardRoutes.use('/deck', CardDeckRoutes);

CardRoutes.use('/ability', CardAbilityRoutes);
