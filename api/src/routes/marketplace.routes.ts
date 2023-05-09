import { Router } from "express";
import { RequestMiddleware as middleware } from '../middleware/request.middleware';
import { RequestController as controller } from '../controllers/request.controller';
import { Marketplace } from "../models/data/marketplace.model";
import { Item } from "../models/data/item.model";

export const MarketplaceRoutes = Router();

MarketplaceRoutes.get('/all', [middleware.findAll({ model: Marketplace})], controller.result(Marketplace));

MarketplaceRoutes.get("/", [middleware.find({ model: Marketplace})], controller.result(Marketplace));

MarketplaceRoutes.post("/", [middleware.add({ model: Marketplace})], controller.message("last"));

MarketplaceRoutes.put("/", [middleware.get({ model: Marketplace}), middleware.edit({ model: Marketplace})], controller.message("last"));

MarketplaceRoutes.delete("/", [middleware.get({ model: Marketplace}), middleware.remove({ model: Marketplace})], controller.message("last"));