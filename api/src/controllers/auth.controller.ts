import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Server, Socket } from 'socket.io';
import { Config } from '../config';
import { User } from '../models/data/user.model';
import { FunctionUtil } from '../utils/function.util';
import { Validation } from '../models/data/validation.model';
import { MailController } from './mail.controller';
import { Inventory } from '../models/data/inventory.model';

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

  export async function signup(req: Request, res: Response): Promise<any> {
    if (!req.body.mail) return res.status(400).send({ message: "No mail provided!" });

    const token = FunctionUtil.randomToken();
    const register = await Validation.create({
      token: token,
      mail: req.body.mail
    } as any)
    if (register == null) return res.status(500).send({ message: "Registration failed!" });
    
    const mail = await MailController.sendRegister(register);
    if (!mail) return res.status(500).send({ message: "Mail sending failed!" });

    res.status(200).send({ message: `Registration send to ${register.mail}! Please also check your Spam folder.` })
  }

  export async function signupToken(io: Server, socket: Socket) {
    const token = FunctionUtil.randomToken();
    const register = await Validation.create({ token: token } as any);
    if (register == null) return socket.emit('error', { message: 'Registration failed!' });

    MailController.signup.subscribe(async (x) => {
      if (x.subject != register.token) return;
      await register.update({ mail: x.address });
      (socket.user ?? {} as any).mail = register.mail;
      socket.emit('auth-mail', register.mail);
    });

    return socket.emit('auth-token', register.token);
  }

  export async function registerSocket(io: Server, socket: Socket, credentials: any) {
    if (!socket.user || !socket.user.mail) return socket.emit('error', { message: 'No mail set!' });
    if (!credentials.user || !credentials.password) return socket.emit('error', { message: 'Credentials incomplete!' });

    // TODO: Check Mail and Username for duplicates

    const register = await Validation.findOne({ mail: socket.user.mail } as any);
    if (!register) return socket.emit('error', { message: `No registration found for mail ${socket.user.mail}!` });

    const user: User = await User.create({
      name: credentials.name,
      mail: register.mail!,
      password: credentials.password
    } as any);
    if (!user) return socket.emit('error', { message: `Registration (user) failed!` });

    const inventory: Inventory = await Inventory.create();
    if (!inventory) return socket.emit('error', { message: `Registration (inventory) failed!` });
    await inventory.$set('user', user);

    await register.destroy();
    socket.emit('auth-register', { message: `Registration for user ${user.name} successfull!` });
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
