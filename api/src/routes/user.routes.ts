import { Router } from "express";
import { RequestController as controller } from "../controllers/request.controller";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { User } from "../models/data/user.model";
import { FriendRoutes } from "./friend.routes";

export const UserRoutes = Router();

UserRoutes.get("/all", [middleware.findAll({ model: User})], controller.result(User));

UserRoutes.get("/", [middleware.find({ model: User})], controller.result(User));

UserRoutes.post("/", [auth.isAdmin, middleware.add({ model: User})], controller.message("last"));

UserRoutes.put("/", [auth.isAdmin, middleware.get({ model: User}), middleware.edit({ model: User})], controller.message("last"));

UserRoutes.delete("/", [auth.isAdmin, middleware.get({ model: User}), middleware.remove({ model: User})], controller.message("last"));

UserRoutes.use("/friend", FriendRoutes);
