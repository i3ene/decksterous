import {Router} from "express";
import {CardTypeController as controller} from "../controllers/cardType.controller";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";

export const CardTypeRoutes = Router();

CardTypeRoutes.get("/all", controller.getAll);

CardTypeRoutes.get("/", controller.get);

CardTypeRoutes.post("/", [auth.isAdmin], controller.add);

CardTypeRoutes.put("/", [auth.isAdmin], controller.edit);

CardTypeRoutes.delete("/", [auth.isAdmin], controller.remove);
