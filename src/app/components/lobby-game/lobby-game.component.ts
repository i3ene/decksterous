import { Component, OnInit, ViewChild } from '@angular/core';
import { SocketKey } from 'src/app/models/object/service.model';
import { DeckItem, Item, ItemAny, ItemType } from 'src/app/models/data/item.model';
import { TokenService } from 'src/app/services/auth/token.service';
import { GameService } from 'src/app/services/game.service';
import { _Object } from 'src/app/models/data/object.model';
import { DataService } from 'src/app/services/data.service';
import { InventoryComponent } from '../inventory/inventory.component';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-lobby-game',
  templateUrl: './lobby-game.component.html',
  styleUrls: ['./lobby-game.component.scss']
})
export class LobbyGameComponent {

  @ViewChild('deckInventory') deckInventoryRef!: InventoryComponent;

  time: Date = new Date();
  decks: _Object<DeckItem>[] = [];

  _selectedObject?: _Object<ItemAny>;
  set selectedObject(value: _Object<ItemAny> | undefined) {
    this._selectedObject = value;
    this.loadDeck(value?.hash);
  }
  get selectedObject() {
    return this._selectedObject;
  }

  constructor(public game: GameService, public socket: RoomService, public data: DataService) {
    this.loadDecks();
  }

  async loadDecks() {
    this.decks = (await this.data.self.inventory).objects?.filter(x => ItemType.DECK == x.item.type) as _Object<DeckItem>[] ?? [];
  }

  get SocketKey() {
    return SocketKey;
  }

  get ItemType() {
    return ItemType;
  }

  get events(): { timestamp: Date; room: string; event: any }[] {
    return []; //this.socket.events.reverse().filter(x => x.timestamp > this.time);
  }

  async loadDeck(objectHash?: string) {
    const objects = objectHash ? await this.data.getSubInventoryObjects(objectHash) : [];
    this.deckInventoryRef.objects = objects;
  }

}
