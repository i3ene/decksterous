import { Item } from "./item.model";

export class Card {
  id?: number;
  itemId?: number;
  typeId?: number;
  health: number;
  damage: number;
  cost: number;
  item?: Item;
  type?: CardType;

  constructor(obj?: any) {
    this.health = obj?.health ?? 0;
    this.damage = obj?.damage ?? 0;
    this.cost = obj?.cost ?? 0;
    if (obj?.id) this.id = Number(obj.id);
    if (obj?.itemId) this.id = Number(obj.itemId);
    if (obj?.typeId) this.typeId = Number(obj.typeId);
    if (obj?.item) this.item = new Item(obj.item);
    if (obj?.type) this.type = new CardType(obj.type);
  }
}

export class CardType {
  id?: number;
  type: string;
  cards?: Card[];

  constructor(obj?: any) {
    this.type = obj?.type ?? '';
    if (obj?.id) this.id = Number(obj.id);
    if (obj?.cards && Array.isArray(obj?.cards)) this.cards = obj.cards.map((x: any) => new Card(x));
  }
}