import {Router} from "express";
import { AuthMiddleware as auth } from "../middleware/auth.middleware";

export const CardTypeRoutes = Router();

CardTypeRoutes.get("/all", );

CardTypeRoutes.get("/", );

CardTypeRoutes.post("/", [auth.isAdmin], );

CardTypeRoutes.put("/", [auth.isAdmin], );

CardTypeRoutes.delete("/", [auth.isAdmin], );
