import { Component, Input, OnInit } from '@angular/core';
import { ItemAny } from 'src/app/models/data/item.model';
import { _Object } from 'src/app/models/data/object.model';
import { RequestService } from 'src/app/services/request/request.service';

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

  constructor(private request: RequestService) { }

  edit() {
    this.editing = true;
  }

  buy() {
    // TODO
  }

  remove() {
    // TODO
  }

  update(value: any) {
    // TODO
    console.log(value);
    this.editing = false;
  }

  reset() {
    // TODO
    this.editing = false;
  }
}
