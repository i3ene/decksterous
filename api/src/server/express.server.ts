import express, { NextFunction, Request, Response } from "express";
import { UserRoutes } from "../routes/user.routes";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(HeaderHandler);

app.use("/user", UserRoutes);

function HeaderHandler(req: Request, res: Response, next: NextFunction) {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    );
    next();
}
