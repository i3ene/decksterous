import {Request, Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {Server, Socket} from 'socket.io';
import {Config} from '../config';
import {User} from '../models/data/user.model';
import {FunctionUtil} from '../utils/function.util';
import {Validation} from '../models/data/validation.model';
import {MailController} from './mail.controller';
import {Inventory} from '../models/data/inventory.model';
import { Handler } from '../utils/handler.util';

export namespace AuthController {
  export function generateToken(req: Request, res: Response) {
    return Handler.Async(async () => {
      if (req.user == null) return res.status(500).send({message: 'User object is null!'});

      var payload = {
        id: req.user.id,
        name: req.user.name,
        mail: req.user.mail,
      };
      var token = jwt.sign(payload, Config.Auth.SECRET);

      console.log('User', req.user.name, 'logged in.');
      res.status(200).send(JSON.stringify(token));
    });
  }

  export function resetPassword(req: Request, res: Response) {
    return Handler.Async(async () => {
      if (req.user == null) return res.status(500).send({message: 'User object is null!'});

      if (req.user.mail != req.body.mail) return res.status(401).send({message: 'Mail not matching for User!'});
      await req.user.update({
        password: req.body.password,
      });

      res.status(200).send({message: 'Password successfully reset!'});
    });
  }

  export function signup(req: Request, res: Response) {
    return Handler.Async(async () => {
      if (!req.body.mail) return res.status(400).send({message: "No mail provided!"});

      const token = FunctionUtil.randomToken();
      const register = await Validation.create({
        token: token,
        mail: req.body.mail
      } as any)
      if (register == null) return res.status(500).send({message: "Registration failed!"});

      const mail = await MailController.sendRegister(register);
      if (!mail) return res.status(500).send({message: "Mail sending failed!"});

      res.status(200).send({message: `Registration send to ${register.mail}! Please also check your Spam folder.`})
    });
  }

  export async function validationToken(io: Server, socket: Socket, type: string) {
    // Create validation object to generate token
    const validation = await Validation.create({ type: type } as any);
    if (validation == null) return socket.emit('error', {message: 'Validation failed!'});

    // Listen to inbox for incoming mail
    const subscription = MailController.inbox.subscribe(async (x) => {
      // Check if subject token is euqal to validation
      if (x.subject != validation.token) return;
      // Find existing validation and destroy if it exists
      const existing = await Validation.findOne({ where: { mail: x.address } });
      if (existing) existing.destroy();
      // Update validation to mail address
      await validation.update({mail: x.address});
      // Emit validation object to socket
      socket.emit('auth-validation', validation);
      // Stop listening for inbox
      subscription.unsubscribe();
    });

    // Return validation to socket
    return socket.emit('auth-validation', validation);
  }

  export async function verifyToken(io: Server, socket: Socket): Promise<any> {
    let token = socket.handshake.headers[Config.Auth.HEADER] as string;
    jwt.verify(token, Config.Auth.SECRET, (err: any, decoded: any) => {
      socket.user = decoded;
      if (err == null) return;
      if (err instanceof jwt.TokenExpiredError) {
        socket.emit('error', {message: 'Token expired!'});
        //socket.disconnect(true);
      } else {
        socket.emit('error', {message: 'Token invalid!'});
        //socket.disconnect(true);
      }
    });
  }

  export async function getSelf(io: Server, socket: Socket): Promise<any> {
    if (socket.user == null) {
      socket.emit('error', {message: 'User object is null!'});
      return //socket.disconnect(true);
    }
    const user: User | null = await User.scope([]).findByPk(socket.user.id);
    if (user == undefined) {
      socket.emit('error', {message: 'No User found for Token ID!'});
      return //socket.disconnect(true);
    }
    socket.user = user;
  }
}
