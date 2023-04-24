import { BroadcastOperator } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { GameEvent, GameEventSet, GameState, GamePlayerCollection, GamePlayerEvent, GameRuleSet } from './game.model';
import { BackendAction, FrontendAction, SocketAction } from './socket.model';

export class Game {
  /**
   * Room connection of server
   */
  room: BroadcastOperator<DefaultEventsMap, any>;

  roomName: string;

  /**
   * Rules for this game
   */
  rules!: GameRuleSet;

  /**
   * Players of this game
   */
  players: GamePlayerCollection;

  /**
   * Game events (with states)
   */
  events: GameEventSet = new GameEventSet();

  /**
   * Ammount of cards possible to place on the field
   */
  fieldSize: number = 5;

  /**
   * If the game is playing
   */
  active: boolean = false;

  /**
   * If something is being executed
   */
  executing: boolean = false;

  constructor(room: BroadcastOperator<DefaultEventsMap, any>, roomName: string) {
    this.players = new GamePlayerCollection(this);
    this.room = room;
    this.roomName = roomName;
    // TODO: Combine rules with default rules

    this.registerEvents();

    this.events[GameEvent.START].emit(GameState.BEFORE, null);
  }

  registerEvents() {
    this.events[GameEvent.START].on(GameState.BEFORE, this.beforeStart.bind(this));
    this.events[GameEvent.START].on(GameState.AT, this.atStart.bind(this));
    this.events[GameEvent.START].on(GameState.AFTER, this.afterStart.bind(this));
    this.events[GameEvent.TURN].on(GameState.BEFORE, this.beforeTurn.bind(this));
    this.events[GameEvent.TURN].on(GameState.AT, this.atTurn.bind(this));
    this.events[GameEvent.TURN].on(GameState.AFTER, this.afterTurn.bind(this));
    this.events[GameEvent.END].on(GameState.BEFORE, this.beforeEnd.bind(this));
    this.events[GameEvent.END].on(GameState.AT, this.atEnd.bind(this));
    this.events[GameEvent.END].on(GameState.AFTER, this.afterEnd.bind(this));

    this.players.events.addListener(SocketAction.INTERNAL, this.playerEventHandler.bind(this));
  }

  playerEventHandler(event: GamePlayerEvent) {
    // Handle global player events
    switch (event.action) {
      case BackendAction.READY_CHANGED:
        this.room.emit(SocketAction.FRONTEND_ALL, `${event.player?.user.name} is ${event.args.state ? 'ready' : 'not ready'}.`);
        if (!this.players.areReady()) break;
        this.events[GameEvent.START].emit(GameState.AFTER, null);
        break;
      default:
        // Emit to all in room, except the sender (the player that triggered this action)
        event.player.socket.broadcast.to(this.roomName).emit(SocketAction.FRONTEND_ALL, event.args);
        break;
    }
  }

  playerActionEventHandler(event: GamePlayerEvent) {
    // Check if something is being executed
    if (this.executing) return;

    // Check if game is not running
    if (!this.active) {
      // Handle basic events
      switch (event.action) {
        case FrontendAction.SELECT_DECK:
          event.player.selectDeck(event.args.deckId);
          break;
        case FrontendAction.SET_READY:
          event.player.setReady(event.args.state);
          break;
      }
    }

    // Check if player action is from current players turn
    if (this.players.current != event.player) {
      // Handle turn based events
      switch (event.action) {
        case FrontendAction.DRAW_CARD:
          event.player.drawCards(event.args.amount);
          break;
        case FrontendAction.PLACE_CARD:
          event.player.placeCard(event.args.card, event.args.field);
          break;
        case FrontendAction.END_TURN:
          this.players.turn();
          break;
      }
    }
  }

  beforeStart(event: any): void {
    console.log('BeforeStart');
    this.events[GameEvent.START].emit(GameState.AT, null);
  }

  atStart(event: any): void {
    console.log('AtStart');
  }

  afterStart(event: any): void {
    console.log('AfterStart');
    this.players.sync();
    this.active = true;
    this.events[GameEvent.TURN].emit(GameState.BEFORE, null);
  }

  beforeTurn(event: any): void {
    console.log('BeforeTurn');
    this.events[GameEvent.TURN].emit(GameState.AT, null);
  }

  atTurn(event: any): void {
    console.log('AtTurn');
    this.executing = false;
  }

  afterTurn(event: any): void {
    console.log('AfterTurn');
    this.executing = true;
    this.players.attack(true);
  }

  beforeEnd(event: any): void {
    console.log('BeforeEnd');
    this.active = false;
  }

  atEnd(event: any): void {
    console.log('AtEnd');
  }

  afterEnd(event: any): void {
    console.log('AfterEnd');
  }
  
}
