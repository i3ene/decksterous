import { Component, Input, ViewChild } from '@angular/core';
import { InventoryComponent } from 'src/app/components/inventory/inventory.component';
import { ItemAny } from 'src/app/models/data/item.model';
import { _Object } from 'src/app/models/data/object.model';
import { DataService } from 'src/app/services/data.service';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-sub-object-inventory',
  templateUrl: './sub-object-inventory.component.html',
  styleUrls: ['./sub-object-inventory.component.scss']
})
export class DevSubObjectInventoryComponent {

  @ViewChild(InventoryComponent) ref!: InventoryComponent;

  _objectHash: string = '';
  @Input() set objectHash(value: string) {
    console.log(value);
    if (!value) return;
    this._objectHash = value;
    this.loadObjects();
  }
  get objectHash() {
    return this._objectHash;
  }

  constructor(private request: RequestService, private data: DataService) {}

  async loadObjects() {
    const objects = await this.data.getSubInventoryObjects(this.objectHash);
    this.ref.objects = objects;
  }

  async addItem(itemHash: string) {
    await this.request.post(`/subinventory/object/${this.objectHash}/${itemHash}`);
    this.loadObjects();
  }

  addItems(objects: _Object<ItemAny>[]) {
    objects.forEach(x => this.addItem(x.hash));
  }

  async removeItem(itemHash: string) {
    await this.request.delete(`/subinventory/object/${this.objectHash}/${itemHash}`);
    this.loadObjects();
  }

  removeSelectedItems() {
    this.ref.selectedObjects.forEach(x => this.removeItem(x.object.hash));
  }

}
