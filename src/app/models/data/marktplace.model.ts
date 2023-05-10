import { InventoryItem } from './inventory.model';

export class Marketplace {
  objectId: number;
  price: number;

  inventoryItem?: InventoryItem

  constructor(obj?: any) {
    this.objectId = obj?.objectId ?? 0;
    this.price = obj?.price ?? 0;
    if (obj?.inventoryItem) this.inventoryItem = new InventoryItem(obj.inventoryItem);
  }
}
