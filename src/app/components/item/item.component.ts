import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item, ItemAny, ItemType } from 'src/app/models/data/item.model';
import { _Object } from 'src/app/models/data/object.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() object!: _Object<ItemAny>;
  @Input() selectable: boolean = false;
  @Output() clickedEvent: EventEmitter<_Object<ItemAny>> = new EventEmitter<_Object<ItemAny>>();

  selected: boolean = false;
  defaultSrc: string = '/assets/undefined.svg';

  get ItemType() {
    return ItemType;
  }
}
