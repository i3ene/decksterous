import { Router } from "express";
import { AuthController as controller } from "../controllers/auth.controller";
import { RequestController } from "../controllers/request.controller";
import { UserController } from "../controllers/user.controller";
import { AuthMiddleware as middleware } from "../middleware/auth.middleware";
import { RequestMiddleware } from "../middleware/request.middleware";
import { UserMiddleware } from "../middleware/user.middleware";
import { Inventory } from "../models/data/inventory.model";
import { User } from "../models/data/user.model";

export const AuthRoutes = Router();

AuthRoutes.get("/test", [RequestMiddleware.findAll(User)], RequestController.result(User));

AuthRoutes.post("/test", [RequestMiddleware.add(User)], RequestController.result(User));



AuthRoutes.post("/signin", [middleware.verifyUser, middleware.verifyPassword], controller.generateToken);

AuthRoutes.post("/signup", [middleware.checkDuplicateName, middleware.checkDuplicateMail], UserController.add);

AuthRoutes.post("/passwordreset", [middleware.verifyUser], controller.resetPassword);
