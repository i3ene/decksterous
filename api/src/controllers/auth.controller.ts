import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { ServerConfig } from '../config/server.config';


export namespace AuthController {
  export async function generateToken(req: Request, res: Response): Promise<any> {
    if (req.user == null) return res.status(500).send({ message: 'User object is null!' });

    var payload = {
      id: req.user.id,
      name: req.user.name,
      mail: req.user.mail,
    };
    var token = jwt.sign(payload, ServerConfig.SECRET);

    console.log('User', req.user.name, 'logged in.');
    res.status(200).send(token);
  }
}
