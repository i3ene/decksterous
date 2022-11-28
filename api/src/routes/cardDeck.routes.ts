
import { Router } from 'express';
import { RequestController as controller } from "../controllers/request.controller";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { CardDeck } from '../models/data/cardDeck.model';
import { Item } from '../models/data/item.model';
import { InventoryItem } from '../models/data/relations/inventory_item.model';

export const CardDeckRoutes = Router();

CardDeckRoutes.get("/all", [middleware.findAll(CardDeck)], controller.result(CardDeck));

CardDeckRoutes.get("/", [middleware.find(CardDeck, ['inventoryItems'])], controller.result(CardDeck));

CardDeckRoutes.post("/", [auth.isAdmin, middleware.add(CardDeck)], controller.message("last"));

CardDeckRoutes.put("/", [auth.isAdmin, middleware.get(CardDeck), middleware.edit(CardDeck)], controller.message("last"));

CardDeckRoutes.delete("/", [auth.isAdmin, middleware.get(CardDeck), middleware.remove(CardDeck)], controller.message("last"));

CardDeckRoutes.post("/item", [auth.isAdmin, middleware.get(CardDeck, [], undefined, ["deck", "id"]), middleware.get(InventoryItem, [], undefined, ["item", "id"]), middleware.addAssociation(CardDeck, "inventoryItems", InventoryItem)], controller.message("last"));

CardDeckRoutes.post("/items", [auth.isAdmin, middleware.get(CardDeck, [], undefined, ["deck", "id"]), middleware.getAll(InventoryItem, [], 'items', undefined, 'id'), middleware.addAssociation(CardDeck, "inventoryItems", InventoryItem)], controller.message("last"));

CardDeckRoutes.delete("/item", [auth.isAdmin, middleware.get(CardDeck, [], undefined, ["deck", "id"]), middleware.get(InventoryItem, [], undefined, ["item", "id"]), middleware.removeAssociation(CardDeck, "inventoryItems", InventoryItem)], controller.message("last"));

CardDeckRoutes.delete("/items", [auth.isAdmin, middleware.get(CardDeck, [], undefined, ["deck", "id"]), middleware.getAll(InventoryItem, [], 'items', undefined, 'id'), middleware.removeAssociation(CardDeck, "inventoryItems", InventoryItem)], controller.message("last"));