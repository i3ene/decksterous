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

CardRoutes.get('/all', [middleware.findAll(Card, ['item', 'abilities'])], controller.result(Card));

CardRoutes.get('/', [middleware.find(Card, ['item', 'abilities'])], controller.result(Card));

CardRoutes.post('/', [auth.isAdmin, middleware.add(Card), middleware.getAll(CardAbility, [], 'abilities', undefined, 'id'), middleware.setAssociation(Card, "abilities", CardAbility)], controller.message('success'));

CardRoutes.put('/', [auth.isAdmin, middleware.get(Card), middleware.edit(Card), middleware.getAll(CardAbility, [], 'abilities', undefined, 'id'), middleware.setAssociation(Card, "abilities", CardAbility)], controller.message('success'));

CardRoutes.delete('/', [auth.isAdmin, middleware.get(Card), middleware.remove(Card)], controller.message('last'));

CardRoutes.use('/type', CardTypeRoutes);

CardRoutes.use('/deck', CardDeckRoutes);

CardRoutes.use('/ability', CardAbilityRoutes);
