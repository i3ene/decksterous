import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { InventoryComponent } from 'src/app/components/inventory/inventory.component';
import { EditCardDeckDialogue } from 'src/app/dialogues/edit-card-deck/edit-card-deck.component';
import { SellItemDialogue } from 'src/app/dialogues/sell-item/sell-item.component';
import { DeckItem, Item, ItemAny, ItemType } from 'src/app/models/data/item.model';
import { IMarketplace, SubInventory, _Object } from 'src/app/models/data/object.model';
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
      case ItemType.DECK:
        this.editDeck(object as _Object<DeckItem>);
        break;
      default:
        this.sellItem(object);
        break;
    }
  }

  editDeck(data: _Object<DeckItem>): void {
    const dialog = this.dialog.open(EditCardDeckDialogue, {
      data: {
        deck: data,
        objects: this.inventory.objects
      },
    });
    dialog.afterClosed().subscribe(async (x) => {
      switch(x) {
        case 'Save':
          var deck = dialog.componentInstance.deck;
          const toAdd = (deck.subInventory?.subObjects ?? []).filter(x => !(data.subInventory?.subObjects ?? []).some(y => x.hash == y.hash));
          const toRemove = (data.subInventory?.subObjects ?? []).filter(x => !(deck.subInventory?.subObjects ?? []).some(y => x.hash == y.hash));
          toAdd.forEach(x => this.data.self.addCardToDeck(deck.hash, x.hash));
          toRemove.forEach(x => this.data.self.removeCardFromDeck(deck.hash, x.hash));
          break;
        case 'Delete':
          var deck = dialog.componentInstance.deck;
          this.deleteItem(deck.hash);
          break;
      }
    });
  }

  async addDeck() {
    const subInv = await this.data.self.addDeck(1);
    const obj = await this.data.getObject(subInv.objectHash);
    (await this.data.self.inventory).objects?.push(obj);
    this.editDeck(obj as _Object<DeckItem>);
  }

  sellItem(object: _Object<ItemAny>) {
    const dialog = this.dialog.open(SellItemDialogue, {
      data: object
    });
    dialog.afterClosed().subscribe(async (x) => {
      if (x == 'Sell') {
        const payload: IMarketplace = { objectHash: object.hash, price: object.marketplace?.price ?? 0 };
        await this.data.self.sellMarketplaceObject(payload);
      }
    });
  }

  async deleteItem(hash: string) {
    await this.data.self.deleteObject(hash);
    var inventory = (await this.data.self.inventory);
    if (inventory.objects) inventory.objects = inventory.objects.filter(x => x.hash != hash);
    this.loadInventory();
  }
}
