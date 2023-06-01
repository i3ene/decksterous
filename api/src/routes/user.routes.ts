import { Router } from "express";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { RequestController as controller } from "../controllers/request.controller";
import { User } from "../models/data/user.model";

export const UserRoutes = Router();

UserRoutes.get(["/all", "/all/:page"], [middleware.findAll({ model: User, page: { size: 100, key: "page" } })], controller.result(User));

UserRoutes.post("/", [auth.isAdmin, middleware.add({ model: User })], controller.result(User));


export const UserIdRoutes = Router();

UserRoutes.use("/:id", [middleware.get({ model: User, body: { key: 'id' } })], UserIdRoutes);

UserIdRoutes.get("/", controller.result(User));

UserIdRoutes.put("/", [auth.isAdmin, middleware.edit({ model: User })], controller.result(User));

UserIdRoutes.delete("/", [auth.isAdmin, middleware.remove({ model: User })], controller.message("last"));

UserIdRoutes.get("/friend", [middleware.getAssociation({ model: User, association: { name: "friend" } })], controller.result([User, "friends"]));
