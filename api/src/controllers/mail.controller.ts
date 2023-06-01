import { createTransport } from "nodemailer";
import IMAP from 'imap';
import { simpleParser } from "mailparser";
import { Config } from "../config";
import { Register } from "../models/data/register.model";
import { Subject } from 'rxjs';

export namespace MailController {
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

  export const receiver = new IMAP({
    user: Config.Mail.ADDRESS,
    password: Config.Mail.PASSWORD,
    host: Config.Mail.HOST,
    port: Config.Mail.PORT.RECEIVE,
    tls: true,
    tlsOptions: {
      rejectUnauthorized: false
    },
    //debug: console.log
  });

  export const signup: Subject<{ address: string, subject: string }> = new Subject();

  export async function receiveSignup() {
    // TODO: get all unseen mails, retrieve subject, and mark them as seen
    const mail: { address: string, subject: string }[] = [];
    mail.forEach(x => signup.next(x));
  }

  export async function sendRegister(register: Register) {
    const link = `https://game.decksterous.digital/auth/register?token=${register.token}`;
    const info = await sender.sendMail({
      from: `"Decksterous" <${Config.Mail.ADDRESS}>`,
      to: register.mail,
      subject: "Signup",
      text: `Finish signup here: ${link}`,
      html: `Finish signup <a href="${link}">here</a>!`
    });

    return info.accepted.length > 0;
  }

  export async function testSend() {
    const info = await sender.sendMail({
      from: `"Decksterous" <${Config.Mail.ADDRESS}>`,
      to: "benedikt.muell@gmail.com",
      subject: "Hello from node",
      text: "Hello world?",
      html: "<strong>Hello world?</strong>",
      headers: { 'x-myheader': 'test header' }
    });
  
    console.log("Message sent: %s", info.response);
  }

  export async function testReceive() {
    receiver.on('ready', () => {
      receiver.openBox('INBOX', false, () => {
        receiver.search([ 'ALL' ], function(err, results) {
          // fetch all resulting messages
          const mails = receiver.fetch(results, { bodies: '' });
          mails.on('message', msg => {
            msg.on('body', stream => {
              simpleParser(stream, async (err, parsed) => {
                console.log(parsed.subject);
              });
            });
          });
        });
      });
    });
  }
}

MailController.receiver.connect();