import { Item } from "./item.model";

export class Inventory {
  id?: number;
  userId?: number;
  items?: Item[];

  constructor(obj: any) {
    if (obj?.id) this.id = Number(obj.id);
    if (obj?.userId) this.userId = Number(obj.userId);
    if (obj?.items) this.items = obj.items.map((x: any) => new Item(x));
  }
}