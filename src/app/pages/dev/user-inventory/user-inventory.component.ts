import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { InventoryComponent } from 'src/app/components/inventory/inventory.component';
import { ItemComponent } from 'src/app/components/item/item.component';
import { Item, ItemAny } from 'src/app/models/data/item.model';
import { _Object } from 'src/app/models/data/object.model';
import { DataService } from 'src/app/services/data.service';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'dev-user-inventory',
  templateUrl: './user-inventory.component.html',
  styleUrls: ['./user-inventory.component.scss'],
})
export class DevUserInventoryComponent {
  @ViewChild(InventoryComponent) ref!: InventoryComponent;

  _inventoryId: number = 0;
  @Input() set inventoryId(value: number) {
    this._inventoryId = value;
    this.loadInventory();
  }
  get inventoryId() {
    return this._inventoryId;
  }

  @Output() selectedEvent: EventEmitter<_Object<ItemAny>[]> = new EventEmitter<_Object<ItemAny>[]>();

  constructor(private request: RequestService, private data: DataService) {}

  async loadInventory() {
    const objects = await this.data.getInventoryObjects(this.inventoryId);
    this.ref.objects = objects;
  }

  async addItem(itemId: number) {
    await this.request.post(`/inventory/${this.inventoryId}/${itemId}`);
    this.loadInventory();
  }

  addItems(objects: _Object<ItemAny>[]) {
    //objects.forEach(x => this.addItem(x.hash));
  }

  async removeItem(objectHash: string) {
    await this.request.delete(`/inventory/${this.inventoryId}/${objectHash}`);
    this.loadInventory();
  }

  removeSelectedItems() {
    this.ref.selectedObjects.forEach(x => this.removeItem(x.object.hash));
  }

  selectItems() {
    this.selectedEvent.emit(this.ref.selectedObjects.map(x => x.object));
  }
}
