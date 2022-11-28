import { Component, ChangeDetectionStrategy, Input, ViewChildren } from '@angular/core';
import { CardDeck } from 'src/app/models/data/card.model';
import { Inventory } from 'src/app/models/data/inventory.model';
import { Item } from 'src/app/models/data/item.model';
import { RequestService } from 'src/app/services/request/request.service';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss'],
})
export class InventoryComponent {
  @ViewChildren(ItemComponent) itemRefs!: ItemComponent[];

  @Input() set deckId(value: number) {
    if (!value) return;
    this.setId('deck', value);
  }

  @Input() set inventoryId(value: number) {
    if (!value) return;
    this.setId('inventory', value);
  }

  @Input() set userId(value: number) {
    if (!value) return;
    this.setId('user', value);
  }

  @Input() selectable: boolean = false;

  id?: { type: 'deck' | 'user' | 'inventory'; value: number };

  inventory?: Inventory;
  deck?: CardDeck;
  items: Item[] = new Array(14).fill({ name: 'Item', description: 'Description', image: 'Image' });

  constructor(private request: RequestService) {}

  async loadItems(id: number, user?: boolean) {
    const payload = await this.request.get(`/inventory?${user ? 'userId' : 'id'}=${id}`);
    this.inventory = new Inventory(payload);
    if (!this.inventory.items) this.items = [];
    else this.items = this.inventory.items;
  }

  async loadDeckItems(id: number) {
    const payload = await this.request.get(`/item/card/deck?id=${id}`);
    this.deck = new CardDeck(payload);
    if (!this.deck.items) this.items = [];
    else this.items = this.deck.items;
  }

  get selectedItems(): ItemComponent[] {
    if (!this.itemRefs) return [];
    return this.itemRefs.filter((x) => x.selected);
  }

  setId(type: 'deck' | 'user' | 'inventory', id: number) {
    this.id = { type: type, value: id };
    this.realod();
  }

  realod(): void {
    this.deck = undefined;
    this.inventory = undefined;

    switch (this.id?.type) {
      case 'deck':
        this.loadDeckItems(this.id.value);
        break;
      case 'user':
        this.loadItems(this.id.value, true);
        break;
      case 'inventory':
        this.loadItems(this.id.value, false);
        break;
    }
  }
}
