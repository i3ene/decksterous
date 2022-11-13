import { Router } from 'express';
import { AuthMiddleware as auth } from '../middleware/auth.middleware';
import { RequestMiddleware as middleware } from '../middleware/request.middleware';
import { RequestController as controller } from '../controllers/request.controller';
import { CardType } from '../models/data/cardType.model';

export const CardTypeRoutes = Router();

CardTypeRoutes.get('/all', [middleware.findAll(CardType)], controller.result(CardType));

CardTypeRoutes.get('/', [middleware.find(CardType, ['items'])], controller.result(CardType));

CardTypeRoutes.post('/', [auth.isAdmin, middleware.add(CardType)], controller.message('last'));

CardTypeRoutes.put('/', [auth.isAdmin, middleware.get(CardType), middleware.edit(CardType)], controller.message('last'));

CardTypeRoutes.delete('/', [auth.isAdmin, middleware.get(CardType), middleware.remove(CardType)], controller.message('last'));
