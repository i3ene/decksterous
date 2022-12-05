import { Router } from "express";
import { RequestController as controller } from "../controllers/request.controller";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { CardDeck } from "../models/data/cardDeck.model";
import { Inventory } from "../models/data/inventory.model";
import { Item } from "../models/data/item.model";
import { User } from "../models/data/user.model";

export const SelfRoutes = Router();

SelfRoutes.post("/friend/invite", [auth.getSelf('user'), middleware.get({ model: User, data: { name: 'friend'}}), middleware.addAssociation({ model: User, association: { name: 'friends', data: 'friend' }, data: { key: 'user'}})], controller.message("last"));

SelfRoutes.post("/friend/decline", [auth.getSelf('user'), middleware.get({ model: User, data: { name: 'friend'}}), middleware.removeAssociation({ model: User, association: { name: 'friends', data: 'friend' }, data: { key: 'user' }})], controller.message("last"));

//SelfRoutes.post("/deck", [auth.getSelf('user', ['inventory']), middleware.add(CardDeck), middleware.addAssociation(Inventory, "items", Item)], controller.message("last"));