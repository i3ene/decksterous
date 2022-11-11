import { Router } from "express";
import { RequestController as controller } from "../controllers/request.controller";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { User } from "../models/data/user.model";
import { FriendRoutes } from "./friend.routes";

export const UserRoutes = Router();

UserRoutes.get("/all", [middleware.findAll(User)], controller.result(User));

UserRoutes.get("/", [middleware.find(User)], controller.result(User));

UserRoutes.post("/", [auth.isAdmin, middleware.add(User)], controller.message("last"));

UserRoutes.put("/", [auth.isAdmin, middleware.get(User), middleware.edit(User)], controller.message("last"));

UserRoutes.delete("/", [auth.isAdmin, middleware.get(User), middleware.remove(User)], controller.message("last"));

UserRoutes.use("/friend", FriendRoutes);
