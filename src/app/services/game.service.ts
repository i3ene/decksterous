import { Injectable } from '@angular/core';
import { SocketService } from './request/socket.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  event: string = 'backend';

  all: Observable<any>;
  player: Observable<any>;

  constructor(public socket: SocketService) {
    this.player = this.socket.socket.fromEvent<any>('frontend_player');
    this.all = this.socket.socket.fromEvent<any>('frontend_all');
  }

  selectDeck(id: number | string) {
    id = typeof id == 'string' ? Number(id) : id;
    this.socket.emitEvent(this.event, {
      action: "select_deck",
      args: {
        deckId: id
      }
    });
  }

  setReady(state: boolean) {
    this.socket.emitEvent(this.event, {
      action: "set_ready",
      args: {
        state: state
      }
    });
  }
}
