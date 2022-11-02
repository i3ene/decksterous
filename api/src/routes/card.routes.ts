import {Router} from "express";
import {CardController as controller} from "../controllers/card.controller";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";

export const CardRoutes = Router();

CardRoutes.get("/all", controller.getAll);

CardRoutes.get("/", controller.get);

CardRoutes.post("/", [auth.isAdmin], controller.add);

CardRoutes.put("/", [auth.isAdmin], controller.edit);

CardRoutes.delete("/", [auth.isAdmin], controller.remove);
