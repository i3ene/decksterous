import EventEmitter from "events";
import { GameEvent, GameEvents, GameEventState, GamePlayer, GamePlayers, GameRules } from "./game.model";

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

  constructor(name: string, rules: GameRules, ...players: GamePlayer[]) {
    this.name = name;
    this.players = new GamePlayers(players);
    // TODO: Combine rules with default rules
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
    this.events[GameEvent.TURN].emit(GameEventState.AT, null);
  }

  afterTurn(): void {
    this.players.next();
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