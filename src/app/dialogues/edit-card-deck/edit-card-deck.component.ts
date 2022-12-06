import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryComponent } from 'src/app/components/inventory/inventory.component';
import { CardDeck } from 'src/app/models/data/card.model';
import { Item, ItemType } from 'src/app/models/data/item.model';

@Component({
  templateUrl: './edit-card-deck.component.html',
  styleUrls: ['./edit-card-deck.component.scss']
})
export class EditCardDeckDialogue implements OnInit {

  @ViewChild("inventoryDeck", { static: true }) inventoryDeck!: InventoryComponent;
  @ViewChild("inventoryCards", { static: true }) inventoryCards!: InventoryComponent;

  deck!: CardDeck;
  editMode!: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public ref: MatDialogRef<EditCardDeckDialogue>,) {
    this.ref.beforeClosed().subscribe(x => {
      this.deck.items = this.inventoryDeck.items;
      this.deck.items.forEach(x => x.card = undefined);
    });
  }

  ngOnInit(): void {
    this.inventoryCards.items = (this.data.items as Item[]).filter(x => x.type == ItemType.CARD);
    this.editMode = !!this.data.deck;

    if(this.editMode) {
      this.deck = Object.assign({}, this.data.deck);
      this.deck.item = Object.assign({}, this.deck.item);
    } else {
      this.deck = new CardDeck();
      this.deck.item = new Item();
      this.inventoryDeck.items = [];
    }
  }

  filterCards() {
    this.inventoryCards.items = this.inventoryCards.items.filter(x => !this.inventoryDeck.items.some(y => y.id == x.id));
  }

  moveToDeck(item: Item) {
    this.inventoryDeck.items.push(item);
    this.filterCards();
  }

  moveToCards(item: Item) {
    let index = this.inventoryDeck.items.findIndex(x => x.id == item.id);
    let card = this.inventoryDeck.items.splice(index, 1);
    this.inventoryCards.items.push(card[0]);
  }
}
