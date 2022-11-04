export class User {
  id?: number;
  name: string;
  password?: string;
  mail?: string;

  constructor(obj?: any) {
    this.name = obj?.name ?? '';
    if (obj?.id) this.id = Number(obj.id);
    if (obj?.password) this.password = obj.password;
    if (obj?.mail) this.mail = obj.mail;
  }
}
