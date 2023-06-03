import { Router } from "express";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { RequestController as controller } from "../controllers/request.controller";
import { Ability } from "../models/data/ability.model";

export const AbilityRoutes = Router();

AbilityRoutes.get(["/all", "/all/:page"], [middleware.findAll({ model: Ability, page: { size: 100, key: "page" } })], controller.result(Ability));

AbilityRoutes.post("/", [auth.isAdmin, middleware.add({ model: Ability })], controller.result(Ability));


export const AbilityIdRoutes = Router();

AbilityRoutes.use("/:id", [middleware.get({ model: Ability, body: { key: 'id' } })], AbilityIdRoutes);

AbilityIdRoutes.get("/", controller.result(Ability));

AbilityIdRoutes.put("/", [auth.isAdmin, middleware.edit({ model: Ability })], controller.result(Ability));

AbilityIdRoutes.delete("/", [auth.isAdmin, middleware.remove({ model: Ability })], controller.message("last"));