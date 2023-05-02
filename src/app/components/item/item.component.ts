import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Item, ItemType} from 'src/app/models/data/item.model';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
    @Input() item!: Item;
    @Input() selectable: boolean = false;
    @Output() clickedEvent: EventEmitter<Item> = new EventEmitter<Item>();

    selected: boolean = false;
    defaultSrc: string = '/assets/undefined.svg';

    getTypeImage(item: Item): string {

        //TODO test error, maybe here?

        switch (item.type) {
            case ItemType.CARD:
                // TODO: Card Icon
                break;
            case ItemType.DECK:
                // TODO: Card Deck Icon
                break;
            case ItemType.ITEM:
                // TODO: Item Icon
                break;
        }
        return this.defaultSrc;

    }
}
