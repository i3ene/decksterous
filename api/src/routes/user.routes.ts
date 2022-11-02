import { Router } from "express";
import { UserController as controller } from "../controllers/user.controller";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";

export const UserRoutes = Router();

UserRoutes.get("/all", controller.getAll);

UserRoutes.get("/", controller.get);

UserRoutes.post("/", [auth.isAdmin], controller.add);

UserRoutes.put("/", [auth.isAdmin], controller.edit);

UserRoutes.delete("/", [auth.isAdmin], controller.remove);
