import { ModelUtils } from "src/app/utils/model.util";
import { Item, ItemFactory } from "./item.model";
import { Inventory } from "./user.model";


 /* Interfaces */

export interface IObject {
  hash: string;
  itemId: number;
}

export interface ISubInventory {
  id: number;
  subObjects?: Object[];
}

export interface IMarketplace {
  objectHash: string;
  price: number;
}

/* Abstracts */

export abstract class AObject implements IObject {
  hash: string;
  itemId: number;

  constructor(obj?: any) {
    this.hash = obj?.hash ?? '';
    this.itemId = Number(obj?.itemId ?? 0);
  }
}

export abstract class ASubInventory implements ISubInventory {
  id: number;
  objectHash: string;

  constructor(obj?: any) {
    this.id = Number(obj?.id ?? 0);
    this.objectHash = obj?.objectHash ?? '';
  }
}

export abstract class AMarketplace implements IMarketplace {
  objectHash: string;
  price: number;

  constructor(obj?: any) {
    this.objectHash = obj?.objectHash ?? '';
    this.price = Number(obj?.price ?? 0);
  }
}

/* Classes */

export class _Object<T extends Item> extends AObject {
  item: T;
  inventory?: Inventory;
  marketplace?: Marketplace;
  subInventory?: SubInventory;

  constructor(obj?: any, type?: new (obj?: any) => T) {
    super(obj);
    this.item = new ItemFactory<T>(type).parse(obj?.item) as T;
    if (obj) this.inventory = new Inventory(obj?.inventory);
    if (obj) this.marketplace = new Marketplace(obj?.marketplace);
    if (obj) this.subInventory = new SubInventory(obj?.subInventory);
  }
}

export class SubInventory extends ASubInventory {
  subObjects?: _Object<any>[];

  constructor(obj?: any) {
    super(obj);
    obj = obj?.subObjects;
    if (obj) this.subObjects = ModelUtils.parseArray(_Object, obj);
  }
}

export class Marketplace extends AMarketplace {
  object: _Object<any>;

  constructor(obj?: any) {
    super(obj);
    this.object = new _Object(obj?.object)
  }
}

/* Factory */

export class ObjectFactory<T extends Item> {
  type: ModelParsable<T>;

  constructor(type: ModelParsable<T>) {
    this.type = type;
  }

  parse(obj?: any) {
    return new _Object<T>(obj, this.type);
  }
}

/* Types */

export type ModelParsable<T> = new (obj?: any) => T;
