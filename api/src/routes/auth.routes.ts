import { Router } from "express";
import { AuthController as controller } from "../controllers/auth.controller";
import { UserController } from "../controllers/user.controller";
import { AuthMiddleware as middleware } from "../middleware/auth.middleware";

export const AuthRoutes = Router();

AuthRoutes.post("/signin", [middleware.verifyUser, middleware.verifyPassword], controller.generateToken);

AuthRoutes.post("/signup", [middleware.checkDuplicateName, middleware.checkDuplicateMail], UserController.add);

AuthRoutes.post("/passwordreset", [middleware.verifyUser], controller.resetPassword)