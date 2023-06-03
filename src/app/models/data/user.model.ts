
/* Interfaces */

import { ModelUtils } from "src/app/utils/model.util";
import { _Object } from "./object.model";

export interface IInventory {
  id: number;
  userId?: number;
}

export interface ICredentials {
  name: string;
  password: string;
}

export interface IUser extends ICredentials {
  id: number;
  xp: number;
  coins: number;
  mail?: string;
  avatar?: any;
}

export interface IFriends {
  accepted?: User[];
  invites?: User[];
  requests?: User[];
}

/* Abstracts */

export abstract class AInventory implements IInventory {
  id: number;
  userId?: number;
  
  constructor(obj?: any) {
    this.id = Number(obj?.id ?? 0);
    this.userId = Number(obj?.userId ?? 0);
  }
}

export abstract class AUser implements IUser {
  id: number;
  xp: number;
  coins: number;
  name: string;
  password: string;
  mail?: string;
  avatar?: any;
  
  constructor(obj?: any) {
    this.id = Number(obj?.id ?? 0);
    this.xp = Number(obj?.xp ?? 0);
    this.coins = Number(obj?.coins ?? 0);
    this.name = obj?.name ?? '';
    this.password = obj?.password ?? '';
    this.mail = obj?.mail ?? '';
    this.avatar = obj?.avatar;
  }
}

export abstract class AFriends implements IFriends {
  accepted?: User[];
  invites?: User[];
  requests?: User[];

  constructor(obj?: any) {
    this.accepted = ModelUtils.parseArray(User, obj?.accepted);
    this.invites = ModelUtils.parseArray(User, obj?.invites);
    this.requests = ModelUtils.parseArray(User, obj?.requests);
  }
}

/* Classes */

export class Inventory extends AInventory {
  objects?: _Object<any>[];
  user?: User;

  constructor(obj?: any) {
    super(obj);
    this.objects = ModelUtils.parseArray(_Object, obj?.objects);
    if (obj) this.user = new User(obj?.user);
  }
}

export class User extends AUser {
  inventory?: Inventory;

  constructor(obj?: any) {
    super(obj);
    if (obj) this.inventory = new Inventory(obj?.inventory);
  }
}

export class Friends extends AFriends {
  constructor(obj?: any) {
    super(obj);
  }
}