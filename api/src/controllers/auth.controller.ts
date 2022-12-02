import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';
import { Config } from '../config';
import { User } from '../models/data/user.model';

export namespace AuthController {
  export async function generateToken(req: Request, res: Response): Promise<any> {
    if (req.user == null) return res.status(500).send({ message: 'User object is null!' });

    var payload = {
      id: req.user.id,
      name: req.user.name,
      mail: req.user.mail,
    };
    var token = jwt.sign(payload, Config.Auth.SECRET);

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

  export async function verifyToken(io: Server, socket: Socket): Promise<any> {
    let token = socket.handshake.headers[Config.Auth.HEADER] as string;
    jwt.verify(token, Config.Auth.SECRET, (err: any, decoded: any) => {
      socket.user = decoded;
      if (err == null) return;
      if (err instanceof jwt.TokenExpiredError) {
        socket.emit('error', { message: 'Token expired!' });
        socket.disconnect(true);
      } else {
        socket.emit('error', { message: 'Token invalid!' });
        socket.disconnect(true);
      }
    });
  }

  export async function getSelf(io: Server, socket: Socket): Promise<any> {
    if (socket.user == null) {
      socket.emit('error', { message: 'User object is null!' });
      return socket.disconnect(true);
    }
    const user: User | null = await User.scope([]).findByPk(socket.user.id);
    if (user == undefined) {
      socket.emit('error', { message: 'No User found for Token ID!' });
      return socket.disconnect(true);
    }
    socket.user = user;
  }
}
