import { Router } from "express";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { RequestController as controller } from "../controllers/request.controller";
import { ObjectMiddleware as objectMiddleware } from "../middleware/object.middleware";
import { UserMiddleware as userMiddleware } from "../middleware/user.middleware";
import { ItemMiddleware as itemMiddleware } from "../middleware/item.middleware";
import { User } from "../models/data/user.model";
import { Marketplace } from "../models/data/marketplace.model";
import { _Object } from "../models/data/object.model";
import { Deck } from "../models/data/deck.model";
import { Inventory } from "../models/data/inventory.model";
import { Item } from "../models/data/item.model";
import { Card } from "../models/data/card.model";
import { SubInventory } from "../models/data/subInventory.model";

export const SelfRoutes = Router();

SelfRoutes.use(auth.getSelf(User));

SelfRoutes.get("/", controller.result(User));

SelfRoutes.get("/game", /* TODO: Get own games */);


export const SelfObjectRoutes = Router();

SelfRoutes.use("/object/:objectHash", [
  middleware.get({ model: _Object, body: { key: 'objectHash' } }),
  objectMiddleware.isOwn(true, { data: { key: _Object } })
], SelfObjectRoutes);

SelfObjectRoutes.delete("/", [middleware.remove({ model: _Object })], controller.message("last"));


export const SelfDeckRoutes = Router();

SelfRoutes.use("/deck", SelfDeckRoutes);

SelfDeckRoutes.get("/", [
  middleware.findAll({ model: Deck })
], controller.result(Deck));


export const SelfDeckCardRoutes = Router();

SelfDeckRoutes.use("/card/:deckHash/:cardHash", [
  middleware.get({ model: _Object, scopes: ["item"], body: { key: "deckHash" }, data: { key: "Deck" } }),
  objectMiddleware.isOwn(true, { data: { key: "Deck" } }),
  middleware.getAssociation({ model: Item, data: { key: ["Deck", "item"] }, association: { name: "deck" } }),
  middleware.check(undefined, true, "Not a valid deck object!", { data: { key: [Deck, "item", "deck"] } }),
  middleware.get({ model: _Object, scopes: ["item"], body: { key: "cardHash" }, data: { key: "Card" } }),
  objectMiddleware.isOwn(true, { data: { key: "Card" } }),
  middleware.getAssociation({ model: Item, data: { key: ["Card", "item"] }, association: { name: "card" } }),
  middleware.check(undefined, true, "Not a valid card object!", { data: { key: [Card, "item", "card"] } }),
  middleware.getAssociation({ model: _Object, data: { key: "Deck" }, association: { name: "subInventory" } })
], SelfDeckCardRoutes);

SelfDeckCardRoutes.post("/", [
  middleware.addAssociation({ model: SubInventory, data: { key: ["Deck", "subInventory"] }, association: { name: "objects", data: "Card" } })
], controller.message("last"));

SelfDeckCardRoutes.delete("/", [
  middleware.removeAssociation({ model: SubInventory, data: { key: ["Deck", "subInventory"] }, association: { name: "objects", data: "Card" } })
], controller.message("last"));


export const SelfDeckIdRoutes = Router();

SelfDeckRoutes.use("/:deckId", [
  middleware.get({ model: Deck, scopes: ["item"], body: { key: "deckId" } })
], SelfDeckIdRoutes);

SelfDeckIdRoutes.get("/", controller.result(Deck));

SelfDeckIdRoutes.post("/", [
  itemMiddleware.createItemObject({ data: { key: [Deck, "item"], name: "object" } }),
  middleware.getAssociation({ model: User, association: { name: "inventory" } }),
  middleware.addAssociation({ model: Inventory, data: { key: [User, "inventory"] }, association: { name: "objects", data: "object" } }),
  itemMiddleware.createObjectSubInventory({ data: { key: "object", name: "subinventory" } })
], controller.result("subinventory"));


export const SelfInventoryRoutes = Router();

SelfRoutes.use("/inventory", [
  middleware.getAssociation({ model: User, scopes: ["objects"], association: { name: "inventory" } })
], SelfInventoryRoutes);

SelfInventoryRoutes.get("/", controller.result([User, "inventory"]));

SelfInventoryRoutes.get("/objects", controller.result([User, "inventory", "objects"]));


export const SelfFriendRoutes = Router();

SelfRoutes.use("/friends", [
  middleware.getAssociation({ model: User, association: { name: "invites" } }),
  middleware.getAssociation({ model: User, association: { name: "requests" } })
], SelfFriendRoutes);

SelfFriendRoutes.get("/", [userMiddleware.searchNewFriends({ data: { key: User, name: "users" } })], controller.result(["users"]))

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

SelfMarketplaceRoutes.get("/other", [
  userMiddleware.getOtherMarketplaceObjects({ data: { key: User, name: 'otherMarketplace' } })
], controller.result('otherMarketplace'));


export const SelfMarketplaceHashRoutes = Router();

SelfMarketplaceRoutes.use("/:hash", [
  middleware.get({ model: Marketplace, scopes: ["object"], body: { key: 'hash' } })
], SelfMarketplaceHashRoutes);

SelfMarketplaceHashRoutes.get("/", [
  objectMiddleware.isOwn(false, { data: { key: [Marketplace, 'object'] } }),
  objectMiddleware.buy({ data: { key: Marketplace } })
], controller.result(Marketplace));

SelfMarketplaceHashRoutes.put("/", [
  objectMiddleware.isOwn(true, { data: { key: [Marketplace, 'object'] } }),
  middleware.edit({ model: Marketplace })
], controller.result(Marketplace));

SelfMarketplaceHashRoutes.delete("/", [
  objectMiddleware.isOwn(true, { data: { key: [Marketplace, 'object'] } }),
  middleware.remove({ model: Marketplace })
], controller.message("last"));
