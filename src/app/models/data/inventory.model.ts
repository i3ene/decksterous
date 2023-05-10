import { Item } from "./item.model";
import { User } from "./user.model";

export class Inventory {
  id?: number;
  userId?: number;
  items?: Item[];

  user?: User;

  constructor(obj: any) {
    if (obj?.id) this.id = Number(obj.id);
    if (obj?.userId) this.userId = Number(obj.userId);
    if (obj?.items) this.items = obj.items.map((x: any) => new Item(x));
    if (obj?.user) this.user = new User(obj.user);
  }
}

export class InventoryItem {
  id?: number;
  inventoryId?: number;
  itemId?: number;
  item?: Item;
  inventory?: Inventory

  constructor(obj: any) {
    if (obj?.id) this.id = Number(obj.id);
    if (obj?.inventoryId) this.inventoryId = Number(obj.inventoryId);
    if (obj?.itemId) this.itemId = Number(obj.itemId);
    if (obj?.item) this.item = new Item(obj.item);
    if (obj?.inventory) this.inventory = new Inventory(obj.inventory);
  }
}
