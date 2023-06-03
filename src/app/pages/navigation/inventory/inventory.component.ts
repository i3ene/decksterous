import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InventoryComponent } from 'src/app/components/inventory/inventory.component';
import { EditCardDeckDialogue } from 'src/app/dialogues/edit-card-deck/edit-card-deck.component';
import { DeckItem, Item, ItemAny, ItemType } from 'src/app/models/data/item.model';
import { SubInventory, _Object } from 'src/app/models/data/object.model';
import { TokenService } from 'src/app/services/auth/token.service';
import { DataService } from 'src/app/services/data.service';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class UserInventoryPage implements OnInit {

  @ViewChild(InventoryComponent, { static: true }) inventory!: InventoryComponent;


  constructor(public dialog: MatDialog, private request: RequestService, private data: DataService) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  async loadInventory() {
    const inventory = await this.data.self.inventory;
    this.inventory.objects = inventory.objects ?? [];
  }

  clicked(object: _Object<ItemAny>): void {
    switch(object.item.type) {
      case ItemType.CARD:
        // TODO: Card Dialogue
        break;
      case ItemType.DECK:
        // TODO: Deck Dialogue
        this.editDeck(object as _Object<DeckItem>);
        break;
      case ItemType.ITEM:
        // TODO: Item Dialogue
        break;
    }
  }

  editDeck(deck: _Object<DeckItem>): void {
    const dialog = this.dialog.open(EditCardDeckDialogue, {
      data: {
        deck: deck,
        objects: this.inventory.objects
      },
    });
    dialog.afterClosed().subscribe(async (x) => {
      switch(x) {
        case 'Save':
          var deck = dialog.componentInstance.deck;
          //await this.request.put('/self/deck', deck);
          this.loadInventory();
          break;
        case 'Delete':
          var deck = dialog.componentInstance.deck;
          await this.data.self.deleteObject(deck.hash);
          this.loadInventory();
          break;
      }
    });
  }

  addDeck() {
    this.data.self.addDeck(1);
  }
}
