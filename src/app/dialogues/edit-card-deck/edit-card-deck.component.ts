import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryComponent } from 'src/app/components/inventory/inventory.component';
import { CardDeck } from 'src/app/models/data/card.model';
import { Item, ItemType } from 'src/app/models/data/item.model';

@Component({
  templateUrl: './edit-card-deck.component.html',
  styleUrls: ['./edit-card-deck.component.scss']
})
export class EditCardDeckDialogue implements OnInit {

  @ViewChild(InventoryComponent, { static: true }) inventory!: InventoryComponent;

  deck!: CardDeck;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.inventory.items = (this.data.items as Item[]).filter(x => x.type == ItemType.CARD);
    this.deck = Object.assign({}, this.data.deck);
    this.deck.item = Object.assign({}, this.deck.item);
  }

}
