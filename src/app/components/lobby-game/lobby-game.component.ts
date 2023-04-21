import { Component, OnInit } from '@angular/core';
import { Item, ItemType } from 'src/app/models/data/item.model';
import { SocketSubscriptionKey } from 'src/app/models/object/service.model';
import { TokenService } from 'src/app/services/auth/token.service';
import { GameService } from 'src/app/services/game.service';
import { SocketService } from 'src/app/services/request/socket.service';

@Component({
  selector: 'app-lobby-game',
  templateUrl: './lobby-game.component.html',
  styleUrls: ['./lobby-game.component.scss']
})
export class LobbyGameComponent implements OnInit {

  id!: number;
  time: Date = new Date();
  selectedItem?: Item;

  constructor(public game: GameService, public socket: SocketService, private token: TokenService) { }

  get SocketKey() {
    return SocketSubscriptionKey;
  }

  get ItemType() {
    return ItemType;
  }

  get events(): { timestamp: Date; room: string; event: any }[] {
    return this.socket.events.reverse().filter(x => x.timestamp > this.time);
  }

  ngOnInit(): void {
    const data = this.token.getTokenData();
    if (data.id) this.id = data.id;
  }

}
