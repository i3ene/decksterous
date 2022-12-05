import { Card, CardDeck } from "./card.model";
import { InventoryItem } from "./inventory.model";

export class Item {
  id?: number;
  name: string;
  description: string;
  image?: any;
  card?: Card;
  cardDeck?: CardDeck;
  inventoryItem?: InventoryItem;

  constructor(obj?: any, inventoryItem?: any) {
    this.name = obj?.name ?? '';
    this.description = obj?.description ?? '';
    if (obj?.id) this.id = Number(obj.id);
    if (obj?.image) this.image = obj.image;
    if (obj?.card) this.card = new Card(obj.card, this);
    if (obj?.cardDeck) this.cardDeck = new CardDeck(obj.cardDeck, this);
    if (inventoryItem) this.inventoryItem = inventoryItem;
    else if (obj?.inventoryItem) this.inventoryItem = new InventoryItem(obj.inventoryItem);
    else if (obj?.InventoryItem) this.inventoryItem = new InventoryItem(obj.InventoryItem);
    // TODO: Fix spelling mistake
  }

  get type(): ItemType {
    if (this.card) return ItemType.CARD;
    if (this.cardDeck) return ItemType.DECK;
    return ItemType.ITEM;
  }
}

export enum ItemType {
  CARD = "Card",
  DECK = "Deck",
  ITEM = "Item"
}