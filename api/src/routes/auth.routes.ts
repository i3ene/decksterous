import { Router } from "express";
import { AuthMiddleware as authMiddleware } from "../middleware/auth.middleware";
import { AuthController as auth } from "../controllers/auth.controller";
import { RequestMiddleware as middleware } from "../middleware/request.middleware";
import { RequestController as controller } from "../controllers/request.controller";
import { Validation } from "../models/data/validation.model";
import { MailController } from "../controllers/mail.controller";
import { User } from "../models/data/user.model";
import { Inventory } from "../models/data/inventory.model";

export const AuthRoutes = Router();

AuthRoutes.post("/signup", [
  authMiddleware.checkDuplicateMail,
  authMiddleware.setValidation("registration"),
  middleware.add({ model: Validation })
], MailController.sendMail({ data: { key: Validation } }));

AuthRoutes.post("/register", [
  middleware.get({ model: Validation, body: { key: "token" } }),
  authMiddleware.checkValidation({ data: { key: Validation } }),
  authMiddleware.checkDuplicateName,
  authMiddleware.checkPassword,
  middleware.add({ model: User }),
  middleware.add({ model: Inventory }),
  middleware.setAssociation({ model: User, association: { name: "inventory", data: Inventory } }),
  middleware.remove({ model: Validation })
], controller.result(User));

AuthRoutes.post("/reset", [authMiddleware.setValidation("password")], /* TODO: Add validation, send mail with link */);

AuthRoutes.post("/password", /* TODO: Get validation, update password */)

AuthRoutes.post("/signin", [authMiddleware.verifyUser, authMiddleware.verifyPassword], auth.generateToken);