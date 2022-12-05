import { Router } from 'express';
import { AuthMiddleware as auth } from '../middleware/auth.middleware';
import { RequestMiddleware as middleware } from '../middleware/request.middleware';
import { RequestController as controller } from '../controllers/request.controller';
import { CardType } from '../models/data/cardType.model';

export const CardTypeRoutes = Router();

CardTypeRoutes.get('/all', [middleware.findAll({ model: CardType})], controller.result(CardType));

CardTypeRoutes.get('/', [middleware.find({ model: CardType, scopes: ['cards']})], controller.result(CardType));

CardTypeRoutes.post('/', [auth.isAdmin, middleware.add({ model: CardType})], controller.message('last'));

CardTypeRoutes.put('/', [auth.isAdmin, middleware.get({ model: CardType}), middleware.edit({ model: CardType})], controller.message('last'));

CardTypeRoutes.delete('/', [auth.isAdmin, middleware.get({ model: CardType}), middleware.remove({ model: CardType})], controller.message('last'));
