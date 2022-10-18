import { Router } from "express";
import { UserController as controller } from "../controllers/user.controller";

export const UserRoutes = Router();

UserRoutes.get("/all", controller.getAll);

UserRoutes.post("/", controller.add);