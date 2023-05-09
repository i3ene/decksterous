import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { InventoryComponent } from 'src/app/components/inventory/inventory.component';
import { Item } from 'src/app/models/data/item.model';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'dev-deck-inventory',
  templateUrl: './deck-inventory.component.html',
  styleUrls: ['./deck-inventory.component.scss']
})
export class DevDeckInventoryComponent {
  @ViewChild(InventoryComponent) ref!: InventoryComponent;

  @Input() set deckId(value: number) {
    this.ref.deckId = value;
  }

  constructor(private request: RequestService) {}

  async addItems(items: Item[]) {
    let ids = items.map(x => { return { id: x.inventoryItem?.id }});
    const payload = await this.request.post("/item/card/deck/items", {
      deck: { id: this.ref.id?.value },
      items: ids,
    });
    this.ref.reload();
  }

  async removeItems() {
    let ids = this.ref.selectedItems.map(x => { return { id: x.item.inventoryItem?.id }});
    const payload = await this.request.delete("/item/card/deck/items", {
      deck: { id: this.ref.id?.value },
      items: ids,
    });
    this.ref.reload();
  }
}
