import EventEmitter from "events";
import { BroadcastOperator } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { GameEvent, GameEvents, GameEventState, GameLogicState, GamePlayer, GamePlayerEvent, GamePlayers, GameRules } from "./game.model";
import { GameAction } from "./socket.model";

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
  players: GamePlayers;

  /**
   * Game events (with states)
   */
  events: GameEvents = new GameEvents();

  /**
   * Ammount of cards possible to place on the field
   */
  fieldSize: number = 5;

  /**
   * State/Logic machine for game functionallity
   */
  logic: GameLogic;

  constructor(room: BroadcastOperator<DefaultEventsMap, any>) {
    this.players = new GamePlayers(this);
    this.logic = new GameLogic(this);
    this.room = room;
    // TODO: Combine rules with default rules
    this.execute();
  }

  execute(): void {
    let func = "this.";
    func += this.logic.active.state;
    func += this.logic.active.event.charAt(0).toUpperCase() + this.logic.active.event.slice(1);
    func += "();";
    eval(func);
  }

  beforeStart(): void {
    console.log("BeforeStart");
    this.events[GameEvent.START].emit(GameEventState.BEFORE, null);

    this.logic.active.state = GameEventState.AT;
  }

  atStart(): void {
    console.log("AtStart");
    this.events[GameEvent.START].emit(GameEventState.AT, null);

    // Logic handles step
  }

  afterStart(): void {
    console.log("AfterStart");
    this.events[GameEvent.START].emit(GameEventState.AFTER, null);

    this.logic.active.state = GameEventState.BEFORE;
    this.logic.active.event = GameEvent.TURN;
  }

  beforeTurn(): void {
    console.log("BeforeTurn");
    this.events[GameEvent.TURN].emit(GameEventState.BEFORE, null);

    this.logic.active.state = GameEventState.AT;
  }

  atTurn(): void {
    console.log("AtTurn");
    this.events[GameEvent.TURN].emit(GameEventState.AT, null);

    // Logic handles step
  }

  afterTurn(): void {
    console.log("AfterTurn");
    this.logic.attack();
    this.players.turn();
    this.events[GameEvent.TURN].emit(GameEventState.AFTER, null);
  }

  beforeEnd(): void {
    console.log("BeforeEnd");
    this.events[GameEvent.END].emit(GameEventState.BEFORE, null);
  }

  atEnd(): void {
    console.log("AtEnd");
    this.events[GameEvent.END].emit(GameEventState.AT, null);
  }

  afterEnd(): void {
    console.log("AfterEnd");
    this.events[GameEvent.END].emit(GameEventState.AFTER, null);
  }
}

export class GameLogic {
  /**
   * Game object
   */
  game: Game;

  /**
   * Current logic state
   */
  active: GameLogicState = new GameLogicState();

  constructor(ref: Game) {
    this.game = ref;
    this.game.players.events.addListener(GameAction.PLAYER, this.playerEventHandler.bind(this));
  }

  playerEventHandler(event: GamePlayerEvent) {
    switch(event.action) {
      case GameAction.PLAYER_READY:
        if (!this.game.players.areReady()) break;
        this.active.state = GameEventState.AFTER;
        this.game.execute();
        break;
    }
  }

  /**
   * Do attack turn
   */
  attack(): void {
    const next = this.game.players.next;
    const current = this.game.players.current;
    for (const [index, card] of current.field) {
      next.attackCard(card, index);
    }

    this.active.state = GameEventState.AFTER;
  }
}
