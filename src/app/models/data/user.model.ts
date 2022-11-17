export class User {
  id?: number;
  name: string;
  xp: number;
  password?: string;
  mail?: string;
  avatar?: any;

  constructor(obj?: any) {
    this.name = obj?.name ?? '';
    this.xp = obj?.xp ?? 0;
    if (obj?.id) this.id = Number(obj.id);
    if (obj?.password) this.password = obj.password;
    if (obj?.mail) this.mail = obj.mail;
    if (obj?.avatar) this.avatar = obj.avatar;
  }
}
