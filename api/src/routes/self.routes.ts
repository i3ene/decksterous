import { Router } from "express";
import { RequestController as controller } from "../controllers/request.controller";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { User } from "../models/data/user.model";

export const SelfRoutes = Router();

SelfRoutes.post("/friend/invite", [auth.getSelf('user'), middleware.get(User, [], 'friend'), middleware.addAssociation(User, 'friends', 'friend', 'user')], controller.message("last"));