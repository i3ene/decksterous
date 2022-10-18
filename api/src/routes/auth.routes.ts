import { Router } from "express";
import { AuthController as controller } from "../controllers/auth.controller";
import { AuthMiddleware as middleware } from "../middleware/auth.middleware";

export const AuthRoutes = Router();

AuthRoutes.post("/signin", [middleware.verifyUser, middleware.verifyPassword], controller.generateToken);