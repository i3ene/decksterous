
import { Router } from 'express';
import { RequestController as controller } from "../controllers/request.controller";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { CardDeck } from '../models/data/cardDeck.model';
import { Item } from '../models/data/item.model';
import { InventoryItem } from '../models/data/relations/inventory_item.model';

export const CardDeckRoutes = Router();

CardDeckRoutes.get("/all", [middleware.findAll({ model: CardDeck})], controller.result(CardDeck));

CardDeckRoutes.get("/", [middleware.find({ model: CardDeck, scopes: ['inventoryItems']})], controller.result(CardDeck));

CardDeckRoutes.post("/", [auth.isAdmin, middleware.add({ model: CardDeck})], controller.message("last"));

CardDeckRoutes.put("/", [auth.isAdmin, middleware.get({ model: CardDeck}), middleware.edit({ model: CardDeck})], controller.message("last"));

CardDeckRoutes.delete("/", [auth.isAdmin, middleware.get({ model: CardDeck}), middleware.remove({ model: CardDeck})], controller.message("last"));

CardDeckRoutes.post("/item", [auth.isAdmin, middleware.get({ model: CardDeck, body: { key: ["deck", "id"]}}), middleware.get({ model: InventoryItem, body: { key: ["item", "id"] }}), middleware.addAssociation({ model: CardDeck, association: { name: "inventoryItems", data: InventoryItem}})], controller.message("last"));

CardDeckRoutes.post("/items", [auth.isAdmin, middleware.get({ model: CardDeck, body: { key: ["deck", "id"]}}), middleware.getAll({ model: InventoryItem, list: { key: 'items', id: 'id'}}), middleware.addAssociation({ model: CardDeck, association: { name: "inventoryItems", data: InventoryItem}})], controller.message("last"));

CardDeckRoutes.delete("/item", [auth.isAdmin, middleware.get({ model: CardDeck, body: { key: ["deck", "id"]}}), middleware.get({ model: InventoryItem, body: { key: ["item", "id"] }}), middleware.removeAssociation({ model: CardDeck, association: { name: "inventoryItems", data: InventoryItem}})], controller.message("last"));

CardDeckRoutes.delete("/items", [auth.isAdmin, middleware.get({ model: CardDeck, body: { key: ["deck", "id"]}}), middleware.getAll({ model: InventoryItem, list: { key: 'items', id: 'id'}}), middleware.removeAssociation({ model: CardDeck, association: { name: "inventoryItems", data: InventoryItem}})], controller.message("last"));