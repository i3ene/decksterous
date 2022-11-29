import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InventoryComponent } from 'src/app/components/inventory/inventory.component';
import { CardDeckDialogue } from 'src/app/dialogues/card-deck/card-deck.component';
import { Item, ItemType } from 'src/app/models/data/item.model';
import { TokenService } from 'src/app/services/auth/token.service';

@Component({
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class UserInventoryPage implements OnInit {

  @ViewChild(InventoryComponent, { static: true }) inventory!: InventoryComponent;

  id!: number;

  constructor(private token: TokenService, public dialog: MatDialog) {}

  ngOnInit(): void {
    const data = this.token.getTokenData();
    if (data.id) this.id = data.id;
  }

  clicked(item: Item): void {
    switch(item.type) {
      case ItemType.CARD:
        // TODO: Card Dialogue
        break;
      case ItemType.DECK:
        // TODO: Deck Dialogue
        this.createDeck();
        break;
      case ItemType.ITEM:
        // TODO: Item Dialogue
        break;
    }
  }

  createDeck() {
    this.dialog.open(CardDeckDialogue, {
      data: {
        items: this.inventory.items
      },
    });
  }
}
