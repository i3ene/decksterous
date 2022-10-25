export interface IUser {
  id?: number;
  name: string;
  password?: string;
  mail?: string;
}

export class User implements IUser {

  id?: number;
  name: string;
  password?: string;
  mail?: string;

  constructor(obj?: any) {
    obj ??= {};
    this.name = (obj.name ??= "");
    this.id = obj.id;
    this.password = obj.password;
    this.mail = obj.mail;
  }

}
