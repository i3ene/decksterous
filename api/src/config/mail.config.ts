import secret from "./secret.json";

export namespace MailConfig {
  export const HOST: string = secret.mail.host;
  export const ADDRESS: string = secret.mail.address;
  export const PASSWORD: string = secret.mail.password;

  export namespace PORT {
    export const SEND: number = Number(secret.mail.port.send);
    export const RECEIVE: number = Number(secret.mail.port.receive);
  }
}