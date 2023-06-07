import {createTransport} from "nodemailer";
import IMAP from 'imap';
import {Config} from "../config";
import {Subject} from 'rxjs';
import {RequestUtils} from "../utils/request.util";
import {Request, Response} from "express";
import {RequestOptionsData} from "../models/object/request.model";
import { simpleParser } from "mailparser";
import { Validation } from "../models/data/validation.model";
import { ValidationType } from "../models/object/validation.object";

export namespace MailController {
  /**
   * Sender object. Used for sending mails.
   */
  export const sender = createTransport({
    host: Config.Mail.HOST,
    port: Config.Mail.PORT.SEND,
    secure: false,
    requireTLS: false,
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      user: Config.Mail.ADDRESS,
      pass: Config.Mail.PASSWORD,
    },
    logger: true
  });

  /**
   * Receiver object. Usedd for receiving mails.
   */
  export const receiver = new IMAP({
    user: Config.Mail.ADDRESS,
    password: Config.Mail.PASSWORD,
    host: Config.Mail.HOST,
    port: Config.Mail.PORT.RECEIVE,
    tls: true,
    tlsOptions: {
      rejectUnauthorized: false
    },
    keepalive: {
      forceNoop: true,
      interval: 10000,
      idleInterval: 20000,
    },
    //debug: console.log
  });

  /**
   * Inbox observer. Emits currently received mail with Subject and Address of sender.
   */
  export const inbox: Subject<{ address: string, subject: string }> = new Subject();

  /**
   * Connect and set up listener for inbox.
   */
  export function listenInbox() {
    receiver.connect();
    // Listen on connection establishement
    receiver.on("ready", () => {
      // Open inbox
      receiver.openBox('INBOX', false, () => {
        // Listen for mails
        receiver.on("mail", (messages: number) => {
          fetchInbox();
        });
      });
    })
  }

  /**
   * Fetch all `'unseen'` mails from inbox.
   * Marks mails as `'seen'` after fetch and emits them over {@link inbox inbox}.
   */
  export async function fetchInbox() {
    // Get all unseen messges
    receiver.search([ 'UNSEEN' ], function(err, results) {
      // If no results, stop
      if (!results.length) return;
      // Mark all as read
      receiver.setFlags(results, ['\\SEEN'], (err) => err ? console.error(err) : undefined);
      // Fetch all resulting messages
      const mails = receiver.fetch(results, { bodies: '' });
      // Parse all messages
      mails.on('message', msg => {
        msg.on('body', stream => {
          simpleParser(stream, async (err, parsed) => {
            const mail: { address: string, subject: string } = {
              address: parsed.from?.value[0]?.address ?? '',
              subject: parsed.subject ?? ''
            };
            // Emit inbox mail
            inbox.next(mail);
          });
        });
      });
    });
  }

  /**
   * Function to send registration mails
   * @param validation Validation object containing `mail` and `token`
   * @returns On success `true`
   */
  export async function sendRegister(validation: Validation) {
    const link = `https://game.decksterous.digital/auth/registration?token=${validation.token}`;
    const info = await sender.sendMail({
      from: `"Decksterous" <${Config.Mail.ADDRESS}>`,
      to: validation.mail,
      subject: "Signup",
      text: `Finish signup here: ${link}`,
      html: `Finish signup <a href="${link}">here</a>!`
    });

    return info.accepted.length > 0;
  }

  /**
   * Function to send password reset mails
   * @param validation Validation object containing `mail` and `token`
   * @returns On success `true`
   */
  export async function sendPasswordReset(validation: Validation) {
    const link = `https://game.decksterous.digital/auth/password?token=${validation.token}`;
    const info = await sender.sendMail({
      from: `"Decksterous" <${Config.Mail.ADDRESS}>`,
      to: validation.mail,
      subject: "Signup",
      text: `Reset password here: ${link}`,
      html: `Reset password <a href="${link}">here</a>!`
    });

    return info.accepted.length > 0;
  }

  export function sendMail(options: RequestOptionsData) {
    return async (req: Request, res: Response) => {
      const key = options.data?.key;
      const data = RequestUtils.byAttribute(req.data, key) as Validation;
      
      var success = false;
      switch(data.type as ValidationType) {
        case "registration":
          success = await sendRegister(data);
          break;
        case "password":
          success = await sendPasswordReset(data);
          break;
      }
      
      if (success) if (success) return res.status(200).send({ message: `Mail send to ${data.mail}! Please also check your Spam folder.` });
      else res.status(500).send({ message: "Something went wrong!" });
    }
  }
}

MailController.listenInbox();
