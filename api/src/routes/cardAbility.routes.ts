import { Router } from 'express';
import { AuthMiddleware as auth } from '../middleware/auth.middleware';
import { RequestMiddleware as middleware } from '../middleware/request.middleware';
import { RequestController as controller } from '../controllers/request.controller';
import { CardAbility } from '../models/data/cardAbility.model';

export const CardAbilityRoutes = Router();

CardAbilityRoutes.get('/all', [middleware.findAll(CardAbility)], controller.result(CardAbility));

CardAbilityRoutes.get('/', [middleware.find(CardAbility, ['cards'])], controller.result(CardAbility));

CardAbilityRoutes.post('/', [auth.isAdmin, middleware.add(CardAbility)], controller.message('last'));

CardAbilityRoutes.put('/', [auth.isAdmin, middleware.get(CardAbility), middleware.edit(CardAbility)], controller.message('last'));

CardAbilityRoutes.delete('/', [auth.isAdmin, middleware.get(CardAbility), middleware.remove(CardAbility)], controller.message('last'));
