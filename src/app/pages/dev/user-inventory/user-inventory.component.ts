import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { InventoryComponent } from 'src/app/components/inventory/inventory.component';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'dev-user-inventory',
  templateUrl: './user-inventory.component.html',
  styleUrls: ['./user-inventory.component.scss'],
})
export class DevUserInventoryComponent {
  @ViewChild(InventoryComponent) ref!: InventoryComponent;

  @Input() set inventoryId(value: number) {
    this.ref.inventoryId = value;
  }
  @Input() set userId(value: number) {
    this.ref.userId = value;
  }

  constructor(private request: RequestService) {}

  async addItem(id: number) {
    if (!id || !this.ref.inventory?.id) return;
    const payload = await this.request.post('/inventory/item', {
      inventory: { id: this.ref.inventory?.id },
      item: { id: id },
    });
  }

  async removeItems() {
    if (!this.ref.inventory?.id) return;
    let ids = this.ref.selectedItems.map(x => { return { id: x.item.id }});
    const paylod = await this.request.delete("/inventory/item", {
      inventory: { id: this.ref.inventory?.id },
      items: ids,
    });
    this.ref.loadItems(this.ref.inventory.id);
  }
}
