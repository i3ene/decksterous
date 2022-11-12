export class Item {
  id?: number;
  name: string;
  description: string;
  image?: string | any;

  constructor(obj: any) {
    this.name = obj?.name ?? '';
    this.description = obj?.description ?? '';
    if (obj?.id) this.id = Number(obj.id);
    if (obj?.image) this.image = obj.image;
  }
}