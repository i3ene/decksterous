import { Injectable } from '@angular/core';
import { SocketService } from './request/socket.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Player, PlayerCollection } from '../models/data/player.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  signal: string = 'backend';

  all: Observable<any>;
  player: Observable<any>;
  event: Observable<any>;

  collection: PlayerCollection = new PlayerCollection();

  constructor(public socket: SocketService, private router: Router) {
    // Socket observables
    this.player = this.socket.socket.fromEvent<any>('frontend_player');
    this.all = this.socket.socket.fromEvent<any>('frontend_all');
    this.event = this.socket.socket.fromEvent<any>('frontend_event');
    // Socket subscriptions
    this.player.subscribe(x => this.handler(x, true));
    this.all.subscribe(this.handler.bind(this));
    this.event.subscribe(this.handleEvent.bind(this));
  }

  handler(event: any, self: boolean = false) {
    event.playerId ??= this.collection.ownId;
    var player = this.collection.players.get(event.playerId)!;
    switch(event.action) {
      case 'sync':
        player = new Player(event.args);
        if (self) this.collection.ownId = player.id;
        this.collection.set(player.id, player);
        break;
      case 'card_drawn':
        const card = player.deck.draw(1);
        player.hand.addCards(card);
        break;
    }
  }

  handleEvent(event: any) {
    if (event.event == 'start' && event.state == 'after') {
      this.router.navigate(['game']);
    }
  }

  selectDeck(id: number | string) {
    id = typeof id == 'string' ? Number(id) : id;
    this.socket.emitEvent(this.signal, {
      action: "select_deck",
      args: {
        deckId: id
      }
    });
  }

  setReady(state: boolean) {
    this.socket.emitEvent(this.signal, {
      action: "set_ready",
      args: {
        state: state
      }
    });
  }
}
