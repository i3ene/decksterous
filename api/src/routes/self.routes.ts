import { Router } from "express";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { RequestController as controller } from "../controllers/request.controller";
import { ObjectMiddleware as objectMiddleware } from "../middleware/object.middleware";
import { UserMiddleware as userMiddleware } from "../middleware/user.middleware";
import { User } from "../models/data/user.model";
import { Marketplace } from "../models/data/marketplace.model";
import { _Object } from "../models/data/object.model";

export const SelfRoutes = Router();

SelfRoutes.use(auth.getSelf(User));

SelfRoutes.get("/inventory", [
  middleware.getAssociation({ model: User, scopes: ["objects"], association: { name: "inventory" } })
], controller.result([User, "inventory"]));

SelfRoutes.get("/game", /* TODO: Get own games */);


export const SelfFriendRoutes = Router();

SelfRoutes.use("/friend", [
  middleware.getAssociation({ model: User, association: { name: "invites" } }),
  middleware.getAssociation({ model: User, association: { name: "requests" } })
], SelfFriendRoutes);

SelfFriendRoutes.get("/all", controller.result([User, "friends"]));

SelfFriendRoutes.get("/accepted", controller.result([User, "friendAccepted"]));

SelfFriendRoutes.get("/invites", controller.result([User, "friendInvites"]));

SelfFriendRoutes.get("/requests", controller.result([User, "friendRequests"]));


export const SelfFriendIdRoutes = Router();

SelfFriendRoutes.use("/:friendId", [
  middleware.get({ model: User, data: { key: "friend" }, body: { key: "friendId" } })
], SelfFriendIdRoutes);

SelfFriendIdRoutes.post("/", [
  userMiddleware.checkFriend("invites", { data: { key: User }, other: "friend" }),
  middleware.addAssociation({ model: User, association: { name: "invites", data: "friend" } })
], controller.message("last"));

SelfFriendIdRoutes.delete("/", [
  middleware.removeAssociation({ model: User, association: { name: "requests", data: "friend" } }),
  middleware.removeAssociation({ model: User, association: { name: "invites", data: "friend" } })
], controller.message("last"));


export const SelfMarketplaceRoutes = Router();

SelfRoutes.use("/marketplace", SelfMarketplaceRoutes);

SelfMarketplaceRoutes.get("/", [
  middleware.getAssociation({ model: User, scopes: ["marketplace"], association: { name: "inventory" } })
], controller.result([User, "inventory", "objects"]));

SelfMarketplaceRoutes.post("/", [
  middleware.get({ model: _Object, body: { key: "objectHash" } }),
  objectMiddleware.isOwn(true, { data: { key: _Object } }),
  middleware.getAssociation({ model: _Object, association: { name: "marketplace" } }),
  middleware.check(undefined, false, "Object is already being sold!", { data: { key: [_Object, "marketplace"] } }),
  middleware.add({ model: Marketplace })
], controller.result(Marketplace));


export const SelfMarketplaceHashRoutes = Router();

SelfMarketplaceRoutes.use("/:hash", [
  middleware.get({ model: Marketplace, scopes: ["object"], body: { key: 'hash' } }),
  objectMiddleware.isOwn(true, { data: { key: [Marketplace, 'object'] } })
], SelfMarketplaceHashRoutes);

SelfMarketplaceHashRoutes.get("/", controller.result(Marketplace));

SelfMarketplaceHashRoutes.put("/", [middleware.edit({ model: Marketplace })], controller.result(Marketplace));

SelfMarketplaceHashRoutes.delete("/", [middleware.remove({ model: Marketplace })], controller.message("last"));