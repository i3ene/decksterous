import { Router } from "express";
import { RequestController as controller } from "../controllers/request.controller";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { User } from "../models/data/user.model";

export const FriendRoutes = Router();

FriendRoutes.get("/", [middleware.get({ model: User}), middleware.getAssociation({ model: User, association: { name: 'friends'}}), middleware.getAssociation({ model: User, association: { name: 'requests'}}), middleware.difference('intersection', [User, 'requests'], [User, 'friends'], 'difference', 'id')], controller.result('difference'));

FriendRoutes.post("/", [auth.isAdmin, middleware.get({ model: User}), middleware.get({ model: User, data: { name: 'friend'}, body: {key: 'friendId'}}), middleware.addAssociation({ model: User, association: { name: 'friends', data: 'friend'}})], controller.message("last"));

FriendRoutes.delete("/", [auth.isAdmin, middleware.get({ model: User}), middleware.get({ model: User, data: { name: 'friend'}, body: {key: 'friendId'}}), middleware.removeAssociation({ model: User, association: { name: 'friends', data: 'friend'}})], controller.message('last'));

FriendRoutes.get("/check", [middleware.get({ model: User}), middleware.get({ model: User, data: { name: 'friend'}, body: {key: 'friendId'}}), middleware.hasAssociation({ model: User, association: {name: 'friends', data: 'friend'}})], controller.result([User, 'friends']));

FriendRoutes.get("/invites", [middleware.get({ model: User}), middleware.getAssociation({ model: User, association: { name: 'friends'}}), middleware.getAssociation({ model: User, association: { name: 'requests'}}), middleware.difference('right', [User, 'requests'], [User, 'friends'], 'difference', 'id')], controller.result('difference'));

FriendRoutes.get("/requests", [middleware.get({ model: User}), middleware.getAssociation({ model: User, association: { name: 'friends'}}), middleware.getAssociation({ model: User, association: { name: 'requests'}}), middleware.difference('left', [User, 'requests'], [User, 'friends'], 'difference', 'id')], controller.result('difference'));
