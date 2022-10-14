import { Request, Response, Router } from "express";

export const TestRoutes = Router();
var visits = 0;

TestRoutes.get("/hello", Hello);

function Hello(req: Request, res: Response) {
    res.status(200).send("Hello!");
}