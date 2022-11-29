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

  constructor(obj: any) {
    this.name = obj?.name ?? '';
    this.description = obj?.description ?? '';
    if (obj?.id) this.id = Number(obj.id);
    if (obj?.image) this.image = obj.image;
    if (obj?.card) this.card = new Card(obj.card, this);
    if (obj?.inventoryItem) this.inventoryItem = new InventoryItem(obj.inventoryItem);
    // TODO: Fix spelling mismatch
    if (obj?.InventoryItem) this.inventoryItem = new InventoryItem(obj.InventoryItem);
  }

  get type() {
    if (this.card) return "Card";
    if (this.cardDeck) return "CardDeck";
    return "Item";
  }
}