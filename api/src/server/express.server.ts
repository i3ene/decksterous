import express from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { AuthRoutes } from '../routes/auth.routes';
import { UserRoutes } from '../routes/user.routes';
import { CardRoutes } from '../routes/card.routes';
import { CardTypeRoutes } from '../routes/cardType.routes';
import { InventoryRoutes } from '../routes/inventory.routes';
import { RequestMiddleware } from '../middleware/request.middleware';

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(RequestMiddleware.header);
app.use(RequestMiddleware.handler);

app.use('/auth', AuthRoutes);

app.use(AuthMiddleware.verifyToken);
app.use('/user', UserRoutes);
app.use('/card', CardRoutes);
app.use('/cardType', CardTypeRoutes);
app.use('/inventory', InventoryRoutes);
