import { Injectable } from '@angular/core';
import { SocketService } from './request/socket.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

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
