import { Router } from "express";
import { AuthController as auth } from "../controllers/auth.controller";
import { RequestController as controller } from "../controllers/request.controller";
import { AuthMiddleware as middleware } from "../middleware/auth.middleware";
import { RequestMiddleware as request } from "../middleware/request.middleware";
import { Inventory } from "../models/data/inventory.model";
import { User } from "../models/data/user.model";

export const AuthRoutes = Router();

AuthRoutes.post("/signin", [middleware.verifyUser, middleware.verifyPassword], auth.generateToken);

AuthRoutes.post("/signup", [middleware.checkDuplicateName, middleware.checkDuplicateMail, request.add({ model: User}), request.add({ model: Inventory}), request.setAssociation({ model: User, association: { name: 'inventory', data: Inventory}})], controller.message(0));

AuthRoutes.post("/passwordreset", [middleware.verifyUser], auth.resetPassword);
