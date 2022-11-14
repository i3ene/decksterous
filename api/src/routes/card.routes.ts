import { Router } from 'express';

import { AuthMiddleware as auth } from '../middleware/auth.middleware';
import { RequestMiddleware as middleware } from '../middleware/request.middleware';
import { RequestController as controller } from '../controllers/request.controller';
import { Card } from '../models/data/card.model';
import { CardTypeRoutes } from './cardType.routes';
import { CardDeckRoutes } from './cardDeck.routes';
import { CardAbilityRoutes } from './cardAbility.routes';

export const CardRoutes = Router();

CardRoutes.get('/all', [middleware.findAll(Card)], controller.result(Card));

CardRoutes.get('/', [middleware.find(Card, ['item', 'ability'])], controller.result(Card));

CardRoutes.post('/', [auth.isAdmin, middleware.add(Card)], controller.message('last'));

CardRoutes.put('/', [auth.isAdmin, middleware.get(Card), middleware.edit(Card)], controller.message('last'));

CardRoutes.delete('/', [auth.isAdmin, middleware.get(Card), middleware.remove(Card)], controller.message('last'));

CardRoutes.use('/type', CardTypeRoutes);

CardRoutes.use('/deck', CardDeckRoutes);

CardRoutes.use('/ability', CardAbilityRoutes);
