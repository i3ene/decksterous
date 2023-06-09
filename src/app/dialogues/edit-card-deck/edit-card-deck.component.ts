import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InventoryComponent } from 'src/app/components/inventory/inventory.component';
import { CardItem, DeckItem, Item, ItemAny, ItemType } from 'src/app/models/data/item.model';
import { ObjectFactory, SubInventory, _Object } from 'src/app/models/data/object.model';
import { DataService } from 'src/app/services/data.service';
import { ModelUtils } from 'src/app/utils/model.util';

@Component({
  templateUrl: './edit-card-deck.component.html',
  styleUrls: ['./edit-card-deck.component.scss']
})
export class EditCardDeckDialogue implements OnInit {

  @ViewChild("inventoryDeck", { static: true }) inventoryDeck!: InventoryComponent;
  @ViewChild("inventoryCards", { static: true }) inventoryCards!: InventoryComponent;

  deck!: _Object<DeckItem>;
  cards: _Object<CardItem>[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { deck: _Object<DeckItem>, objects: _Object<ItemAny>[] }, public ref: MatDialogRef<EditCardDeckDialogue>, private dataService: DataService) {
    this.deck = this.data.deck;
    this.cards = this.data.objects.filter(x => ItemType.CARD == x.item.type) as _Object<CardItem>[];
  }

  ngOnInit(): void {
    this.loadInventories();
  }

  async loadInventories() {
    if (!this.deck.subInventory || !this.deck.subInventory.subObjects) {
      this.deck.subInventory = await this.dataService.getSubInventory(this.deck.hash);
      this.deck.subInventory.subObjects = await this.dataService.getSubInventoryObjects(this.deck.hash);
      this.data.deck = await ModelUtils.parseObject(this.deck);
    }
    this.inventoryDeck.objects = this.deck.subInventory.subObjects;
    this.inventoryCards.objects = this.cards.filter(x => !this.inventoryDeck.objects.some(y => x.hash == y.hash));
  }

  moveToDeck(object: _Object<ItemAny>) {
    if (!this.deck.subInventory || !this.deck.subInventory.subObjects) return;
    this.deck.subInventory.subObjects.push(object);
    //this.dataService.self.addCardToDeck(this.deck, object);
    this.loadInventories();
  }

  moveToCards(object: _Object<ItemAny>) {
    if (!this.deck.subInventory || !this.deck.subInventory.subObjects) return;
    this.deck.subInventory.subObjects = this.deck.subInventory.subObjects.filter(x => x.hash != object.hash);
    //this.dataService.self.removeCardFromDeck(this.deck, object);
    this.loadInventories();
  }
}
