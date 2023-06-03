import { Router } from "express";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { RequestController as controller } from "../controllers/request.controller";
import { Type } from "../models/data/type.model";

export const TypeRoutes = Router();

TypeRoutes.get(["/all", "/all/:page"], [middleware.findAll({ model: Type, page: { size: 100, key: "page" } })], controller.result(Type));

TypeRoutes.post("/", [auth.isAdmin, middleware.add({ model: Type })], controller.result(Type));


export const TypeIdRoutes = Router();

TypeRoutes.use("/:id", [middleware.get({ model: Type, body: { key: 'id' } })], TypeIdRoutes);

TypeIdRoutes.get("/", controller.result(Type));

TypeIdRoutes.put("/", [auth.isAdmin, middleware.edit({ model: Type })], controller.result(Type));

TypeIdRoutes.delete("/", [auth.isAdmin, middleware.remove({ model: Type })], controller.message("last"));