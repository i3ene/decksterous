import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ItemAny } from 'src/app/models/data/item.model';
import { Marketplace, _Object } from 'src/app/models/data/object.model';

@Component({
  selector: 'app-marketplace-item',
  templateUrl: './marketplace-item.component.html',
  styleUrls: ['./marketplace-item.component.scss']
})
export class MarketplaceItemComponent {

  @Input() isSelf: boolean = false;
  
  editing: boolean = false;

  _object!: _Object<ItemAny>;
  @Input() set object(value: _Object<ItemAny>) {
    this._object = value;
  }
  get object(): _Object<ItemAny> {
    return this._object;
  }

  @Output() action: EventEmitter<'buy' | 'remove' | 'update'> = new EventEmitter();

  constructor() { }

  edit() {
    this.editing = true;
  }

  buy() {
    this.action.emit('buy');
  }

  async remove() {
    this.action.emit('remove');
  }

  async update(value: any) {
    (this._object.marketplace ??= {} as Marketplace).price = value;
    this.action.emit('update');
    this.editing = false;
  }

  reset() {
    this.editing = false;
  }
}
