import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user.controller";

export const UserRoutes = Router();

UserRoutes.get("/all", UserController.getAll);

UserRoutes.post("/", UserController.add);