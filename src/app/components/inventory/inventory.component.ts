import { Component, ChangeDetectionStrategy, Input, ViewChildren } from '@angular/core';
import { Inventory } from 'src/app/models/data/inventory.model';
import { Item } from 'src/app/models/data/item.model';
import { RequestService } from 'src/app/services/request/request.service';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent {

  @ViewChildren(ItemComponent) itemRefs!: ItemComponent[];

  @Input() set inventoryId(value: number) {
    if (!value) return;
    this.loadItems(value, false);
  }

  @Input() set userId(value: number) {
    if (!value) return;
    this.loadItems(value, true);
  }

  @Input() selectable: boolean = false;

  inventory?: Inventory;
  items: Item[] = new Array(14).fill({ name: "Item", description: "Description", image: "Image" });

  constructor(private request: RequestService) { }

  async loadItems(id: number, user?: boolean) {
    const payload = await this.request.get(`/inventory?${user ? 'userId' : 'id'}=${id}`);
    this.inventory = new Inventory(payload);
    if (!this.inventory.items) this.items = [];
    else this.items = this.inventory.items;
  }

  get selectedItems(): ItemComponent[] {
    if (!this.itemRefs) return [];
    return this.itemRefs.filter(x => x.selected);
  }

}
