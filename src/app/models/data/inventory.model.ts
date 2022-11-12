export class Inventory {
  id?: number;
  userId?: number;
  items?: any[];

  constructor(obj: any) {
    if (obj?.id) this.id = Number(obj.id);
    if (obj?.userId) this.userId = Number(obj.userId);
    if (obj?.items) this.items = obj.items;
  }
}