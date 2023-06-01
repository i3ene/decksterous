import { Router } from "express";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { RequestController as controller } from "../controllers/request.controller";
import { Pack } from "../models/data/pack.model";

export const PackRoutes = Router();

PackRoutes.get(["/all", "/all/:page"], [middleware.findAll({ model: Pack, page: { size: 100, key: "page" } })], controller.result(Pack));

PackRoutes.post("/", [auth.isAdmin, middleware.add({ model: Pack })], controller.result(Pack));


export const PackIdRoutes = Router();

PackRoutes.use("/:id", [middleware.get({ model: Pack, body: { key: 'id' } })], PackIdRoutes);

PackIdRoutes.get("/", controller.result(Pack));

PackIdRoutes.put("/", [auth.isAdmin, middleware.edit({ model: Pack })], controller.result(Pack));

PackIdRoutes.delete("/", [auth.isAdmin, middleware.remove({ model: Pack })], controller.message("last"));