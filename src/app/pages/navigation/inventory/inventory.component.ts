import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InventoryComponent } from 'src/app/components/inventory/inventory.component';
import { EditCardDeckDialogue } from 'src/app/dialogues/edit-card-deck/edit-card-deck.component';
import { CardDeck } from 'src/app/models/data/card.model';
import { Item, ItemType } from 'src/app/models/data/item.model';
import { TokenService } from 'src/app/services/auth/token.service';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class UserInventoryPage implements OnInit {

  @ViewChild(InventoryComponent, { static: true }) inventory!: InventoryComponent;

  id!: number;

  constructor(private token: TokenService, public dialog: MatDialog, private request: RequestService) {}

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
        this.editDeck(item.cardDeck!);
        break;
      case ItemType.ITEM:
        // TODO: Item Dialogue
        break;
    }
  }

  editDeck(deck: CardDeck): void {
    const dialog = this.dialog.open(EditCardDeckDialogue, {
      data: {
        deck: deck,
        items: this.inventory.items
      },
    });
    dialog.afterClosed().subscribe(async (x) => {
      switch(x) {
        case 'Save':
          var deck = dialog.componentInstance.deck;
          var payload = await this.request.put('/self/deck', deck);
          this.inventory.reload();
          break;
        case 'Delete':
          var deck = dialog.componentInstance.deck;
          var payload = await this.request.delete('/self/deck', deck);
          this.inventory.reload();
          break;
      }
    });
  }

  createDeck() {
    const dialog = this.dialog.open(EditCardDeckDialogue, {
      data: {
        items: this.inventory.items
      },
    });
    dialog.afterClosed().subscribe(async (x) => {
      if (x != 'Save') return;
      const deck = dialog.componentInstance.deck;
      const payload = await this.request.post('/self/deck', deck);
      this.inventory.reload();
    });
  }
}
