import { Router } from "express";
import { UserController as controller } from "../controllers/user.controller";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";

export const UserRoutes = Router();

UserRoutes.get("/all", controller.getAll);

UserRoutes.get("/", controller.get);

UserRoutes.post("/", [auth.isAdmin], controller.add);

UserRoutes.put("/", [auth.isAdmin], controller.edit);

UserRoutes.delete("/", [auth.isAdmin], controller.remove);

UserRoutes.get("/friend", controller.FriendController.get);

UserRoutes.post("/friend", [auth.isAdmin], controller.FriendController.add);

UserRoutes.delete("/friend", [auth.isAdmin], controller.FriendController.remove);

UserRoutes.get("/inventory", controller.InventoryController.get);

UserRoutes.post("/inventory", [auth.isAdmin], controller.InventoryController.set);

UserRoutes.delete("/inventory", [auth.isAdmin], controller.InventoryController.remove);
