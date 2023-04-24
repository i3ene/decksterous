import { Component, ChangeDetectionStrategy, Input, ViewChildren, Output, EventEmitter } from '@angular/core';
import { CardDeck } from 'src/app/models/data/card.model';
import { Inventory } from 'src/app/models/data/inventory.model';
import { Item, ItemType } from 'src/app/models/data/item.model';
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

  @Input() filter: ItemType[] = [];

  @Input() selectable: boolean = false;

  @Output() itemClicked: EventEmitter<Item> = new EventEmitter<Item>();

  @Output() itemsLoaded: EventEmitter<Item[]> = new EventEmitter<Item[]>();

  id?: { type: 'deck' | 'user' | 'inventory'; value: number };

  inventory?: Inventory;
  deck?: CardDeck;
  items: Item[] = []; //new Array(14).fill({ name: 'Item', description: 'Description', image: 'Image' });

  get filteredItems(): Item[] {
    if (!this.filter.length) return this.items;
    else return this.items.filter(x => this.filter.includes(x.type));
  }

  constructor(private request: RequestService) {}

  async loadItems(id: number, type: "inventory" | "user" | "deck" = "inventory") {
    switch (type) {
      case "inventory":
        var payload = await this.request.get(`/inventory?id=${id}`);
        this.inventory = new Inventory(payload);
        var items = this.inventory.items;
        break;
      case "user":
        var payload = await this.request.get(`/inventory?userId=${id}`);
        this.inventory = new Inventory(payload);
        var items = this.inventory.items;
        break;
      case "deck":
        var payload = await this.request.get(`/item/card/deck?id=${id}`);
        this.deck = new CardDeck(payload);
        var items = this.deck.items;
        break;
    }
    // TODO: Fix spelling mismatch on "Item.InventoryItem" (See Item Model)
    if (!items) this.items = [];
    else this.items = items;

    this.itemsLoaded.emit(this.items);
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
        this.loadItems(this.id.value, "deck");
        break;
      case 'user':
        this.loadItems(this.id.value, "user");
        break;
      case 'inventory':
        this.loadItems(this.id.value, "inventory");
        break;
    }
  }
}
