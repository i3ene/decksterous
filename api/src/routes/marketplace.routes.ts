import {Router} from "express";
import {AuthMiddleware as auth} from "../middleware/auth.middleware";
import {RequestMiddleware as middleware} from "../middleware/request.middleware";
import {RequestController as controller} from "../controllers/request.controller";
import {Marketplace} from "../models/data/marketplace.model";

export const MarketplaceRoutes = Router();

MarketplaceRoutes.get(["/all", "/all/:page"], [middleware.findAll({
  model: Marketplace,
  page: {size: 100, key: "page"}
})], controller.result(Marketplace));

MarketplaceRoutes.post("/", [auth.isAdmin, middleware.add({model: Marketplace})], controller.result(Marketplace));


export const MarketplaceHashRoutes = Router();

MarketplaceRoutes.use("/:hash", [middleware.get({model: Marketplace, body: {key: 'hash'}})], MarketplaceHashRoutes);

MarketplaceHashRoutes.get("/", controller.result(Marketplace));

MarketplaceHashRoutes.put("/", [auth.isAdmin, middleware.edit({model: Marketplace})], controller.result(Marketplace));

MarketplaceHashRoutes.delete("/", [auth.isAdmin, middleware.remove({model: Marketplace})], controller.message("last"));
