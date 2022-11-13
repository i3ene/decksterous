import {Router} from "express";

import { AuthMiddleware as auth } from "../middleware/auth.middleware";

export const CardRoutes = Router();

CardRoutes.get("/all", );

CardRoutes.get("/", );

CardRoutes.post("/", [auth.isAdmin], );

CardRoutes.put("/", [auth.isAdmin], );

CardRoutes.delete("/", [auth.isAdmin], );
