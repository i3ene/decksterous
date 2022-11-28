import { InventoryItem } from "./inventory.model";
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
  abilities?: CardAbility[];  

  constructor(obj?: any) {
    this.health = obj?.health ?? 0;
    this.damage = obj?.damage ?? 0;
    this.cost = obj?.cost ?? 0;
    if (obj?.id) this.id = Number(obj.id);
    if (obj?.itemId) this.itemId = Number(obj.itemId);
    if (obj?.typeId) this.typeId = Number(obj.typeId);
    if (obj?.item) this.item = new Item(obj.item);
    if (obj?.type) this.type = new CardType(obj.type);
    if (obj?.abilities) this.abilities = obj.abilities.map((x: any) => new CardAbility(x));
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

export class CardAbility {
  id?: number;
  key?: string;
  name: string;
  description: string;
  
  constructor(obj?: any) {
    this.name = obj?.name ?? '';
    this.description = obj?.description ?? '';
    if (obj?.id) this.id = Number(obj.id);
    if (obj?.key) this.key = obj.key;
  }
}

export class CardDeck {
  id?: number;
  itemId?: number;
  inventoryItems?: InventoryItem[];

  constructor(obj?: any) {
    if (obj?.id) this.id = Number(obj.id);
    if (obj?.itemId) this.itemId = Number(obj.itemId);
    if (obj?.items && Array.isArray(obj?.items)) this.inventoryItems = obj.items.map((x: any) => new InventoryItem(x));
  }

  get items(): Item[] {
    if (!this.inventoryItems) return [];
    return this.inventoryItems.map(x => x.item!);
  }
}