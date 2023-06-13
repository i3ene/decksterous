import express from 'express';
import { AuthMiddleware } from '../middleware/auth.middleware';
import { AuthRoutes } from '../routes/auth.routes';
import { UserRoutes } from '../routes/user.routes';
import { InventoryRoutes } from '../routes/inventory.routes';
import { RequestMiddleware } from '../middleware/request.middleware';
import { ItemRoutes } from '../routes/item.routes';
import { SelfRoutes } from '../routes/self.routes';
import { MarketplaceRoutes } from '../routes/marketplace.routes';
import { ObjectRoutes } from '../routes/object.routes';
import { SubInventoryRoutes } from '../routes/subInventory.routes';
import { DeckRoutes } from '../routes/deck.routes';
import { PackRoutes } from '../routes/pack.routes';
import { GameRoutes } from '../routes/game.routes';
import { AbilityRoutes } from '../routes/ability.routes';
import { TypeRoutes } from '../routes/type.routes';
import { CardRoutes } from '../routes/card.routes';
import { Handler } from '../utils/handler.util';

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
app.use('/marketplace', MarketplaceRoutes);
app.use('/object', ObjectRoutes);
app.use('/subinventory', SubInventoryRoutes);
app.use('/deck', DeckRoutes);
app.use('/card', CardRoutes);
app.use('/pack', PackRoutes);
app.use('/game', GameRoutes);
app.use('/ability', AbilityRoutes);
app.use('/type', TypeRoutes);

app.use(Handler.Sequence);