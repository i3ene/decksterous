import { ModelUtils } from "src/app/utils/model.util";
import { Ability, Type } from "./card.model";
import { ModelParsable } from "./object.model";

/* Interfaces */

export interface IItemType {
  readonly type: ItemType;
}

export interface IItem {
  id: number;
  name: string;
  description: string;
  image?: any;
}

export interface IDeck {
  id: number;
  maxCards: number;
}

export interface ICard {
  id: number;
  typeId: number;
  health: number;
  damage: number;
  cost: number;

}

export interface IPack {
  id: number;
  rarity: number;
}

/* Abstracts */

export abstract class AItem implements IItem {
  id: number;
  name: string;
  description: string;
  image?: any;

  constructor(obj?: any) {
    this.id = Number(obj?.id ?? 0);
    this.name = obj?.name ?? '';
    this.description = obj?.description ?? '';
    if (obj?.image) this.image = obj.image;
  }
}

export abstract class AItemType {
  itemId: number;
  item?: Item;

  constructor(obj?: any) {
    this.itemId = obj?.itemId ?? 0;
    if (obj?.item) this.item = new Item(obj?.item);
  }
}

export abstract class ADeck extends AItemType implements IDeck {
  id: number;
  maxCards: number;
  
  constructor(obj?: any) {
    super(obj);
    this.id = Number(obj?.id ?? 0);
    this.maxCards = Number(obj?.maxCards ?? 0);
  }
}

export abstract class ACard extends AItemType implements ICard {
  id: number;
  typeId: number;
  health: number;
  damage: number;
  cost: number;
  
  constructor(obj?: any) {
    super(obj);
    this.id = Number(obj?.id ?? 0);
    this.typeId = Number(obj?.typeId ?? 0);
    this.health = Number(obj?.health ?? 0);
    this.damage = Number(obj?.damage ?? 0);
    this.cost = Number(obj?.cost ?? 0);
  }
}

export abstract class APack extends AItemType implements IPack {
  id: number;
  rarity: number;
  
  constructor(obj?: any) {
    super(obj);
    this.id = Number(obj?.id ?? 0);
    this.rarity = Number(obj?.rarity ?? 0);
  }
}

/* Classes */

export class Item extends AItem implements IItemType {
  readonly type: ItemType = ItemType.ITEM;

  constructor(obj?: any) {
    super(obj);
  }
}

export class Deck extends ADeck {
  constructor(obj?: any) {
    super(obj);
  }
}

export class Card extends ACard {
  type: Type;
  abilities?: Ability[];

  constructor(obj?: any) {
    super(obj);
    this.type = new Type(obj?.type);
    this.abilities = ModelUtils.parseArray(Ability, obj?.abilities);
  }
}

export class Pack extends APack {
  constructor(obj?: any) {
    super(obj);
  }
}

/* Instances */

export class CardItem extends Item {
  override readonly type: ItemType = ItemType.CARD;
  card: Card;

  constructor(obj?: any) {
    super(obj);
    this.card = new Card(obj?.card);
  }
}

export class DeckItem extends Item {
  override readonly type: ItemType = ItemType.DECK;
  deck: Deck;

  constructor(obj?: any) {
    super(obj);
    this.deck = new Deck(obj?.deck);
  }
}

export class PackItem extends Item {
  override readonly type: ItemType = ItemType.PACK;
  pack: Pack;

  constructor(obj?: any) {
    super(obj);
    this.pack = new Pack(obj?.pack);
  }
}

/* Factory */

export class ItemFactory<T extends Item> {
  type?: ModelParsable<T>;

  constructor(type?: ModelParsable<T>) {
    this.type = type;
  }

  parse(obj?: any) {
    const construct = this.type ?? ItemFactory.getConstruct(ItemFactory.getType(obj));
    return new construct(obj);
  }

  static getType(obj?: any) {
    let type = ItemType.ITEM;
    if (obj?.deck) type = ItemType.DECK;
    if (obj?.card) type = ItemType.CARD;
    if (obj?.pack) type = ItemType.PACK;
    return type;
  }

  static getConstruct(type: ItemType) {
    switch(type) {
      case ItemType.ITEM: return Item;
      case ItemType.CARD: return CardItem;
      case ItemType.DECK: return DeckItem;
      case ItemType.PACK: return PackItem;
      default: return Item;
    }
  }
}

/* Type */

export type ItemAny = Item & Partial<CardItem> & Partial<DeckItem> & Partial<PackItem>;

/* Enum */

export enum ItemType {
  ITEM,
  CARD,
  DECK,
  PACK
}