import { createTransport } from "nodemailer";
import IMAP from 'imap';
import { simpleParser } from "mailparser";
import { Config } from "../config";

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

  export async function testSend() {
    const info = await sender.sendMail({
      from: `"Decksterous" <${Config.Mail.ADDRESS}>`,
      to: "benedikt.muell@t-online.de",
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