import { Router } from "express";
import { UserController as controller } from "../controllers/user.controller";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";

export const UserRoutes = Router();

UserRoutes.get("/all", controller.getAll);

UserRoutes.get("/", controller.get);

UserRoutes.post("/", [auth.isAdmin], controller.add);

UserRoutes.put("/", [auth.isAdmin], controller.edit);

UserRoutes.delete("/", [auth.isAdmin], controller.remove);

UserRoutes.get("/friend", controller.Friend.get);

UserRoutes.post("/friend", [auth.isAdmin], controller.Friend.add);

UserRoutes.delete("/friend", [auth.isAdmin], controller.Friend.remove);

UserRoutes.get("/inventory", controller.Inventory.get);

UserRoutes.post("/inventory", [auth.isAdmin], controller.Inventory.set);

UserRoutes.delete("/inventory", [auth.isAdmin], controller.Inventory.remove);
