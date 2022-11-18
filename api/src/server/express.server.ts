import express from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { AuthRoutes } from '../routes/auth.routes';
import { UserRoutes } from '../routes/user.routes';
import { InventoryRoutes } from '../routes/inventory.routes';
import { RequestMiddleware } from '../middleware/request.middleware';
import { ItemRoutes } from '../routes/item.routes';
import { SelfRoutes } from '../routes/self.routes';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(RequestMiddleware.header);
app.use(RequestMiddleware.handler);

app.use('/auth', AuthRoutes);

app.use(AuthMiddleware.verifyToken);
app.use('/self', SelfRoutes);
app.use('/user', UserRoutes);
app.use('/item', ItemRoutes);
app.use('/inventory', InventoryRoutes);
