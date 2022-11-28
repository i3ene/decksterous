import { InventoryItem } from "./inventory.model";

export class Item {
  id?: number;
  name: string;
  description: string;
  image?: any;
  inventoryItem?: InventoryItem;

  constructor(obj: any) {
    this.name = obj?.name ?? '';
    this.description = obj?.description ?? '';
    if (obj?.id) this.id = Number(obj.id);
    if (obj?.image) this.image = obj.image;
    if (obj?.inventoryItem) this.inventoryItem = new InventoryItem(obj.inventoryItem);
    // TODO: Fix spelling mismatch
    if (obj?.InventoryItem) this.inventoryItem = new InventoryItem(obj.InventoryItem);
  }
}