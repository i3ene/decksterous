import express, { NextFunction, Request, Response } from "express";
import { TestRoutes } from "../routes/test.routes";

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(HeaderHandler);

app.use("/test", TestRoutes)

function HeaderHandler(req: Request, res: Response, next: NextFunction) {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    );
    next();
}
