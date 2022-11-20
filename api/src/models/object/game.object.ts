import EventEmitter from "events";
import { GameEvent, GameEvents, GameEventState, GameLogicState, GamePlayer, GamePlayers, GameRules } from "./game.model";

export class Game {
  /**
   * Name of the game room
   */
  name: string;

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

  constructor(name: string, rules: GameRules, ...players: GamePlayer[]) {
    this.logic = new GameLogic(this);
    this.name = name;
    this.players = new GamePlayers(this, players);
    // TODO: Combine rules with default rules
  }

  execute(): void {
    let func = "this.";
    func += this.logic.active.event;
    func += this.logic.active.state.charAt(0).toUpperCase() + this.logic.active.state.slice(1);
    func += "();";
    eval(func);
  }

  beforeStart(): void {
    this.events[GameEvent.START].emit(GameEventState.BEFORE, null);
  }

  atStart(): void {
    this.events[GameEvent.START].emit(GameEventState.AT, null);
  }

  afterStart(): void {
    this.events[GameEvent.START].emit(GameEventState.AFTER, null);
  }

  beforeTurn(): void {
    this.events[GameEvent.TURN].emit(GameEventState.BEFORE, null);
  }

  atTurn(): void {
    this.logic.attack();
    this.events[GameEvent.TURN].emit(GameEventState.AT, null);
  }

  afterTurn(): void {
    this.players.turn();
    this.events[GameEvent.TURN].emit(GameEventState.AFTER, null);
  }

  beforeEnd(): void {
    this.events[GameEvent.END].emit(GameEventState.BEFORE, null);
  }

  atEnd(): void {
    this.events[GameEvent.END].emit(GameEventState.AT, null);
  }

  afterEnd(): void {
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