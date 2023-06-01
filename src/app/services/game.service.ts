import { Injectable } from '@angular/core';
import { SocketService } from './request/socket.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Player, PlayerCollection } from '../models/data/player.model';
import { Card } from '../models/data/card.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  signal: string = 'backend';

  all: Observable<any>;
  player: Observable<any>;
  event: Observable<any>;

  collection: PlayerCollection = new PlayerCollection();

  listeners: Subscription[] = [];

  constructor(public socket: SocketService, private router: Router) {
    // Socket observables
    this.player = this.socket.socket.fromEvent<any>('frontend_player');
    this.all = this.socket.socket.fromEvent<any>('frontend_all');
    this.event = this.socket.socket.fromEvent<any>('frontend_event');
    // Socket subscriptions
    this.player.subscribe(x => this.handler(x, true));
    this.all.subscribe(this.handler.bind(this));
    this.event.subscribe(this.handleEvent.bind(this));

    this.loadExampleData();
  }

  loadExampleData() {
    this.collection.currentIndex = 0;
    const cards = Array(5).fill({});
    const players = Array(2).fill({}).map((v, i) => new Player({ playerIndex: i, field: cards, deck: cards, cards: cards }));
    players.forEach(x => this.collection.set(x.playerIndex, x));
  }

  handler(event: any, self: boolean = false) {
    event.args.playerIndex ??= this.collection.selfIndex;
    var player = this.collection.players.get(event.args.playerIndex)!;
    switch(event.action) {
      case 'sync':
        if (self) this.removePlacerListener();
        player = new Player(event.args);
        if (self) {
          if (this.collection.selfIndex != player.playerIndex) {
            this.collection.selfIndex = player.playerIndex;
          }
          this.addPlayerListener(player);
        }
        this.collection.set(player.playerIndex, player);
        this.collection.currentIndex = event.args.currentIndex;
        break;
      case 'card_drawn':
        const deckCard = player.deck.draw(1);
        const deckData = new Card(event.args.card);
        deckCard[0]?.loadData(deckData);
        player.hand.addCards(deckCard);
        break;
      case 'card_placed':
        const handCard = player.hand.removeCard(event.args.cardIndex);
        const handData = new Card(event.args.card);
        handCard?.loadData(handData);
        player.field.placeCard(handCard, event.args.fieldIndex);
        break;
      case 'turn_changed':
        this.collection.currentIndex = event.args.currentIndex;
        break;
      case 'card_health_changed':
        const healthCard = player.field.getCard(event.args.fieldIndex);
        if (healthCard) healthCard.text.health.text = String(event.args.card.health);
        break;
      case 'card_removed':
        const removedCard = player.field.removeCard(event.args.fieldIndex);
        break;
    }
  }

  handleEvent(event: any) {
    if (event.event == 'start' && event.state == 'after') {
      this.router.navigate(['game']); 
    }
  }

  removePlacerListener() {
    this.listeners.forEach(x => x.unsubscribe());
    this.listeners = [];
  }

  addPlayerListener(player: Player) {
    const drawCard = player.deck.interaction.clicking.subscribe(x => this.drawCard(1));
    const placeCard = player.field.fieldSelected.subscribe(x => {
      const index = player.hand.active;
      if (index == undefined) return;
      this.placeCard(index, x);
      player.hand.active = undefined;
    });
    this.listeners.push(...[drawCard, placeCard]);
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

  drawCard(amount: number) {
    this.socket.emitEvent(this.signal, {
      action: "draw_card",
      args: {
        amount: amount
      }
    });
  }

  placeCard(cardIndex: number, fieldIndex: number) {
    this.socket.emitEvent(this.signal, {
      action: "place_card",
      args: {
        cardIndex: cardIndex,
        fieldIndex: fieldIndex
      }
    });
  }

  endTurn() {
    this.socket.emitEvent(this.signal, {
      action: "end_turn",
      args: {}
    });
  }
}