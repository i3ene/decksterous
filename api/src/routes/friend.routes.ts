import { Router } from "express";
import { RequestController as controller } from "../controllers/request.controller";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { User } from "../models/data/user.model";

export const FriendRoutes = Router();

FriendRoutes.get("/", [middleware.get(User), middleware.getAssociation(User, 'friends'), middleware.getAssociation(User, 'requests'), middleware.difference('intersection', [User, 'requests'], [User, 'friends'], 'difference', 'id')], controller.result('difference'));

FriendRoutes.post("/", [auth.isAdmin, middleware.get(User), middleware.get(User, [], 'friend', 'friendId'), middleware.addAssociation(User, 'friends', 'friend')], controller.message("last"));

FriendRoutes.delete("/", [auth.isAdmin, middleware.get(User), middleware.get(User, [], 'friend', 'friendId'), middleware.removeAssociation(User, 'friends', 'friend')], controller.message('last'));

FriendRoutes.get("/check", [middleware.get(User), middleware.get(User, [], 'friend', 'friendId'), middleware.hasAssociation(User, 'friends', 'friend')], controller.result([User, 'friends']));

FriendRoutes.get("/invites", [middleware.get(User), middleware.getAssociation(User, 'friends'), middleware.getAssociation(User, 'requests'), middleware.difference('right', [User, 'requests'], [User, 'friends'], 'difference', 'id')], controller.result('difference'));

FriendRoutes.get("/requests", [middleware.get(User), middleware.getAssociation(User, 'friends'), middleware.getAssociation(User, 'requests'), middleware.difference('left', [User, 'requests'], [User, 'friends'], 'difference', 'id')], controller.result('difference'));
