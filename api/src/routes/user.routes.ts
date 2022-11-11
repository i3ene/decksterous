import { Router } from "express";
import { RequestController as controller } from "../controllers/request.controller";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { User } from "../models/data/user.model";

export const UserRoutes = Router();

UserRoutes.get("/all", [middleware.findAll(User)], controller.result(User));

UserRoutes.get("/", [middleware.find(User)], controller.result(User));

UserRoutes.post("/", [auth.isAdmin, middleware.add(User)], controller.message("last"));

UserRoutes.put("/", [auth.isAdmin, middleware.get(User), middleware.edit(User)], controller.message("last"));

UserRoutes.delete("/", [auth.isAdmin, middleware.get(User), middleware.remove(User)], controller.message("last"));

UserRoutes.get("/friend", [middleware.get(User), middleware.getAssociation(User, 'friends'), middleware.getAssociation(User, 'requests'), middleware.difference('intersection', [User, 'requests'], [User, 'friends'], 'difference', 'id')], controller.result('difference'));

UserRoutes.post("/friend", [ middleware.get(User), middleware.get(User, [], 'friend', 'friendId'), middleware.addAssociation(User, 'friends', 'friend')], controller.message("last"));

UserRoutes.delete("/friend", [ middleware.get(User), middleware.get(User, [], 'friend', 'friendId'), middleware.removeAssociation(User, 'friends', 'friend')], controller.message('last'));

UserRoutes.get("/friend/check", [ middleware.get(User), middleware.get(User, [], 'friend', 'friendId'), middleware.hasAssociation(User, 'friends', 'friend')], controller.result([User, 'friends']));

UserRoutes.get("/friend/requests", [middleware.get(User), middleware.getAssociation(User, 'friends'), middleware.getAssociation(User, 'requests'), middleware.difference('right', [User, 'requests'], [User, 'friends'], 'difference', 'id')], controller.result('difference'));

UserRoutes.get("/friend/invites", [middleware.get(User), middleware.getAssociation(User, 'friends'), middleware.getAssociation(User, 'requests'), middleware.difference('left', [User, 'requests'], [User, 'friends'], 'difference', 'id')], controller.result('difference'));
