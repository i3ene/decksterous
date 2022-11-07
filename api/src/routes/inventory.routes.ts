import { Router } from 'express';
import { InventoryController as controller } from '../controllers/inventory.controller';
import { AuthMiddleware as auth } from '../middleware/auth.middleware';

export const InventoryRoutes = Router();

InventoryRoutes.get('/all', controller.getAll);

InventoryRoutes.get('/', controller.get);

InventoryRoutes.post('/', [auth.isAdmin], controller.add);

InventoryRoutes.put('/', [auth.isAdmin], controller.edit);

InventoryRoutes.delete('/', [auth.isAdmin], controller.remove);
