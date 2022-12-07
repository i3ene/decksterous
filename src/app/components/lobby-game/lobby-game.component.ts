import { Component, OnInit } from '@angular/core';
import { SocketSubscriptionKey } from 'src/app/models/object/service.model';
import { GameService } from 'src/app/services/game.service';
import { SocketService } from 'src/app/services/request/socket.service';

@Component({
  selector: 'app-lobby-game',
  templateUrl: './lobby-game.component.html',
  styleUrls: ['./lobby-game.component.scss']
})
export class LobbyGameComponent {

  constructor(public game: GameService, public socket: SocketService) { }

  get SocketKey() {
    return SocketSubscriptionKey;
  }

}
