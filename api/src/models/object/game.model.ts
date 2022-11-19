import EventEmitter from 'events';
import { Socket } from 'socket.io';
import { Card } from '../data/card.model';
import { User } from '../data/user.model';

export enum GameEvent {
  START = 'start',
  TURN = 'turn',
  END = 'end',
}

export enum GameEventState {
  BEFORE = 'before',
  AT = 'at',
  AFTER = 'after',
}

export class GameEvents {
  [GameEvent.START]: EventEmitter = new EventEmitter();
  [GameEvent.TURN]: EventEmitter = new EventEmitter();
  [GameEvent.END]: EventEmitter = new EventEmitter();
}

export interface GameRule {
  [key: string]: any;
}

export interface GameRules {
  [GameEventState.BEFORE]: GameRule[];
  [GameEventState.AT]: GameRule[];
  [GameEventState.AFTER]: GameRule[];
}

export class GamePlayer {
  socket!: Socket;
  user!: User;
  deck!: Card[];
  cards!: Card[];
  field!: Map<number, Card>;
}

export class GamePlayers {
  /**
   * Map of all players
   */
  map: Map<number, GamePlayer> = new Map<number, GamePlayer>();

  /**
   * Start index of the key for the `map`
   */
  readonly _startIndex: number = 1;

  /**
   * Real index
   */
  _index: number = this._startIndex;

  /**
   * Index of current player
   */
  get index(): number {
    return this._index;
  }
  set index(value: number) {
    if (value > this.map.size) this._index = this._startIndex;
    else this._index = Math.max(this._startIndex, value);
  }

  constructor(players: GamePlayer[]) {
    let key = this._startIndex;
    for (const player of players) {
      this.map.set(key++, player);
    }
  }

  /**
   * Increments to next player index.
   * (Rolls back if out of bound.)
   * @returns current `index`
   */
  next(): number {
    return ++this.index;
  }

  /**
   * Retrieve current active player
   * @returns current player
   */
  current(): GamePlayer {
    return this.map.get(this.index)!;
  }
}
