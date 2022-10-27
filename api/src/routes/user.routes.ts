import { Router } from "express";
import { UserController as controller } from "../controllers/user.controller";

export const UserRoutes = Router();

UserRoutes.get("/all", controller.getAll);

UserRoutes.get("/", controller.get);

UserRoutes.post("/", controller.add);

UserRoutes.put("/", controller.edit);

UserRoutes.delete("/", controller.remove);