import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InventoryComponent } from 'src/app/components/inventory/inventory.component';
import { ItemComponent } from 'src/app/components/item/item.component';
import { Item } from 'src/app/models/data/item.model';
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

  @Output() selectedEvent: EventEmitter<Item[]> = new EventEmitter<Item[]>();

  constructor(private request: RequestService) {}

  async addItem(id: number) {
    if (!id || !this.ref.inventory?.id) return;
    const payload = await this.request.post('/inventory/item', {
      inventory: { id: this.ref.inventory?.id },
      item: { id: id },
    });
    this.ref.realod();
  }

  async removeItems() {
    if (!this.ref.inventory?.id) return;
    let ids = this.ref.selectedItems.map(x => { return { id: x.item.id }});
    const paylod = await this.request.delete("/inventory/items", {
      inventory: { id: this.ref.inventory?.id },
      items: ids,
    });
    this.ref.realod();
  }

  selectItems() {
    this.selectedEvent.emit(this.ref.selectedItems.map(x => x.item));
  }
}
