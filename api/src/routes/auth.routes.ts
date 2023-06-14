import { Router } from "express";
import { AuthMiddleware as authMiddleware } from "../middleware/auth.middleware";
import { AuthController as auth } from "../controllers/auth.controller";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { RequestController as controller } from "../controllers/request.controller";
import { Validation } from "../models/data/validation.model";
import { MailController } from "../controllers/mail.controller";
import { User } from "../models/data/user.model";
import { Inventory } from "../models/data/inventory.model";
import { ItemMiddleware as itemMiddleware } from "../middleware/item.middleware";

export const AuthRoutes = Router();

AuthRoutes.post("/signup", [
  authMiddleware.checkDuplicateMail,
  authMiddleware.setValidation("registration"),
  middleware.addOrFind({ model: Validation })
], MailController.sendMail({ data: { key: Validation } }));

AuthRoutes.post("/register/:token", [
  middleware.get({ model: Validation, body: { key: "token" } }),
  authMiddleware.checkValidation({ data: { key: Validation } }),
  authMiddleware.checkDuplicateMail,
  authMiddleware.checkDuplicateName,
  authMiddleware.checkPassword,
  middleware.add({ model: User }),
  middleware.add({ model: Inventory }),
  middleware.setAssociation({ model: User, association: { name: "inventory", data: Inventory } }),
  middleware.remove({ model: Validation }),
  itemMiddleware.addDefaultItems({ data: { key: Inventory } })
], controller.result(User));

AuthRoutes.post("/reset", [
  authMiddleware.setValidation("password"),
  middleware.addOrFind({ model: Validation })
], MailController.sendMail({ data: { key: Validation } }));

AuthRoutes.post("/password/:token", [
  middleware.get({ model: Validation, body: { key: "token" } }),
  authMiddleware.checkValidation({ data: { key: Validation } }),
  authMiddleware.checkPassword,
  authMiddleware.updatePassword({ data: { key: Validation } }),
  middleware.remove({ model: Validation }),
], controller.message("last"));

AuthRoutes.post("/signin", [authMiddleware.verifyUser, authMiddleware.verifyPassword], auth.generateToken);