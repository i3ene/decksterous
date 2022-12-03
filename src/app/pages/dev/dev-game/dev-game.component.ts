import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/request/socket.service';

@Component({
  selector: 'dev-game',
  templateUrl: './dev-game.component.html',
  styleUrls: ['./dev-game.component.scss']
})
export class DevGameComponent {

  event: string = 'game_event';

  constructor(public socket: SocketService) { }

  selectDeck(id: number | string) {
    id = typeof id == 'string' ? Number(id) : id;
    this.socket.emitEvent(this.event, {
      action: "select_deck",
      deckId: id
    });
  }

  setReady(state: boolean) {
    this.socket.emitEvent(this.event, {
      action: "set_ready",
      state: state
    });
  }

}
