import { Component, Input, ViewChildren, Output, EventEmitter } from '@angular/core';
import { Item, ItemAny, ItemType } from 'src/app/models/data/item.model';
import { ItemComponent } from '../item/item.component';
import { Inventory } from 'src/app/models/data/user.model';
import { SubInventory, _Object } from 'src/app/models/data/object.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent {
  @ViewChildren(ItemComponent) itemRefs!: ItemComponent[];

  _objects: _Object<ItemAny>[] = [];
  @Input() set objects(value: _Object<ItemAny>[]) {
    this._objects = value;
  }
  get objects() {
    return this._objects;
  }

  @Input() filter: ItemType[] = [];

  @Input() selectable: boolean = false;

  @Output() itemClicked: EventEmitter<_Object<ItemAny>> = new EventEmitter<_Object<ItemAny>>();

  get filteredObjects(): _Object<ItemAny>[] {
    if (!this.filter.length) return this.objects;
    else return this.objects.filter(x => this.filter.includes(x.item.type));
  }

  get selectedObjects(): ItemComponent[] {
    if (!this.itemRefs) return [];
    return this.itemRefs.filter((x) => x.selected);
  }

}
