import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Config } from '../config';

export namespace AuthController {
  export async function generateToken(req: Request, res: Response): Promise<any> {
    if (req.user == null) return res.status(500).send({ message: 'User object is null!' });

    var payload = {
      id: req.user.id,
      name: req.user.name,
      mail: req.user.mail,
    };
    var token = jwt.sign(payload, Config.Server.SECRET);

    console.log('User', req.user.name, 'logged in.');
    res.status(200).send(JSON.stringify(token));
  }

  export async function resetPassword(req: Request, res: Response): Promise<any> {
    if (req.user == null) return res.status(500).send({ message: 'User object is null!' });

    if (req.user.mail != req.body.mail) return res.status(401).send({ message: 'Mail not matching for User!' });
    await req.user.update({
      password: req.body.password,
    });

    res.status(200).send({ message: 'Password successfully reset!' });
  }
}
