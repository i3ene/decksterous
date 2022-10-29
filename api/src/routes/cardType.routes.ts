import {Router} from "express";
import {CardTypeController as controller} from "../controllers/cardType.controller";

export const CardTypeRoutes = Router();

CardTypeRoutes.get("/all", controller.getAll);

CardTypeRoutes.get("/", controller.get);

CardTypeRoutes.post("/", controller.add);

CardTypeRoutes.put("/", controller.edit);

CardTypeRoutes.delete("/", controller.remove);
