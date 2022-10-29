import {Router} from "express";
import {CardController as controller} from "../controllers/card.controller";

export const CardRoutes = Router();

CardRoutes.get("/all", controller.getAll);

CardRoutes.get("/", controller.get);

CardRoutes.post("/", controller.add);

CardRoutes.put("/", controller.edit);

CardRoutes.delete("/", controller.remove);
