import { BroadcastOperator } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { GameEvent, GameEvents, GameEventState, GamePlayerCollection, GamePlayerEvent, GameRules } from './game.model';
import { GameAction, GameActionEvent, SocketAction } from './socket.model';

export class Game {
  /**
   * Room connection of server
   */
  room: BroadcastOperator<DefaultEventsMap, any>;

  /**
   * Rules for this game
   */
  rules!: GameRules;

  /**
   * Players of this game
   */
  players: GamePlayerCollection;

  /**
   * Game events (with states)
   */
  events: GameEvents = new GameEvents();

  /**
   * Ammount of cards possible to place on the field
   */
  fieldSize: number = 5;

  /**
   * If the game is playing
   */
  active: boolean = false;

  constructor(room: BroadcastOperator<DefaultEventsMap, any>) {
    this.players = new GamePlayerCollection(this);
    this.room = room;
    // TODO: Combine rules with default rules

    this.registerEvents();

    this.events[GameEvent.START].emit(GameEventState.BEFORE, null);
  }

  registerEvents() {
    this.events[GameEvent.START].on(GameEventState.BEFORE, this.beforeStart.bind(this));
    this.events[GameEvent.START].on(GameEventState.AT, this.atStart.bind(this));
    this.events[GameEvent.START].on(GameEventState.AFTER, this.afterStart.bind(this));
    this.events[GameEvent.TURN].on(GameEventState.BEFORE, this.beforeTurn.bind(this));
    this.events[GameEvent.TURN].on(GameEventState.AT, this.atTurn.bind(this));
    this.events[GameEvent.TURN].on(GameEventState.AFTER, this.afterTurn.bind(this));
    this.events[GameEvent.END].on(GameEventState.BEFORE, this.beforeEnd.bind(this));
    this.events[GameEvent.END].on(GameEventState.AT, this.atEnd.bind(this));
    this.events[GameEvent.END].on(GameEventState.AFTER, this.afterEnd.bind(this));

    this.players.events.addListener(GameAction.PLAYER, this.playerEventHandler.bind(this));
  }

  playerEventHandler(event: GamePlayerEvent) {
    // Handle global player events
    switch (event.action) {
      case GameAction.PLAYER_READY:
        this.room.emit(SocketAction.GAME_SOCKET, `${event.player?.user.name} is ${event.args ? 'ready' : 'not ready'}.`);
        if (!this.players.areReady()) break;
        this.events[GameEvent.START].emit(GameEventState.AFTER, null);
        break;
    }
  }

  playerActionEventHandler(event: GamePlayerEvent) {
    // Check if game is not running
    if (!this.active) {
      // Handle basic events
      switch (event.action) {
        case GameActionEvent.SELECT_DECK:
          event.player.selectDeck(event.args.deckId);
          break;
        case GameActionEvent.SET_READY:
          event.player.setReady(event.args.state);
          break;
      }
    }

    // Check if player action is from current players turn
    if (this.players.current != event.player) {
      // Handle turn based events
      switch (event.action) {
        case GameActionEvent.DRAW_CARD:
          event.player.drawCards(event.args.amount);
          break;
        case GameActionEvent.PLACE_CARD:
          event.player.placeCard(event.args.card, event.args.field);
          break;
      }
    }
  }

  beforeStart(event: any): void {
    console.log('BeforeStart');
    this.events[GameEvent.START].emit(GameEventState.AT, null);
  }

  atStart(event: any): void {
    console.log('AtStart');
  }

  afterStart(event: any): void {
    console.log('AfterStart');
    this.active = true;
    this.events[GameEvent.TURN].emit(GameEventState.BEFORE, null);
  }

  beforeTurn(event: any): void {
    console.log('BeforeTurn');
    this.events[GameEvent.TURN].emit(GameEventState.AT, null);
  }

  atTurn(event: any): void {
    console.log('AtTurn');
  }

  afterTurn(event: any): void {
    console.log('AfterTurn');
    this.attack();
    this.players.turn();
  }

  beforeEnd(event: any): void {
    console.log('BeforeEnd');
  }

  atEnd(event: any): void {
    console.log('AtEnd');
  }

  afterEnd(event: any): void {
    console.log('AfterEnd');
  }

  /** ACTIONS **/

  /**
   * Do attack turn
   */
  attack(): void {
    const next = this.players.next;
    const current = this.players.current;
    if (!current) return;
    // TODO: Fix current.field undefined error
    for (const [index, card] of current.field) {
      next.attackCard(card, index);
    }
  }
}
