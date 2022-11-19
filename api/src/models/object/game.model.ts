import EventEmitter from 'events';
import { Socket } from 'socket.io';
import { Card } from '../data/card.model';
import { User } from '../data/user.model';
import { Game } from './game.object';

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
  /**
   * Socket connection of player
   */
  socket: Socket;

  /**
   * User object of player
   */
  user: User;

  /**
   * Selected deck of user;
   */
  deck: Card[];

  /**
   * Cards in hand
   */
  cards: Card[] = [];

  /**
   * Cards on field
   */
  field: Map<number, Card> = new Map<number, Card>();

  /**
   * Reference to the game
   */
  game?: Game;

  constructor(socket: Socket, user: User, deck: Card[]) {
    this.socket = socket;
    this.user = user;
    this.deck = deck;
  }

  /**
   * Draw cards from the deck and put them into the players hand
   * @param amount Amount of cards to draw. (If deck runs empty it skips this)
   * @returns Array of drawn cards
   */
  drawCards(amount: number): Card[] {
    const cards: Card[] = [];
    while (amount-- > 0) {
      cards.push(...this.deck.splice(this.deck.length, 1));
    }
    this.cards.push(...cards);
    return cards;
  }

  /**
   * Place a card on the field. Will take the card out of the hand and put it onto the field.
   * @param cardIndex Index of card in hand
   * @param fieldIndex Index of field
   * @returns If `cardIndex` is out of bound or `fieldIndex` already has a card or is out of bound it will return `false` else `true`
   */
  placeCard(cardIndex: number, fieldIndex: number): boolean {
    if (cardIndex > this.cards.length || this.game!.fieldSize <= fieldIndex || this.field.get(fieldIndex)) return false;
    const card = this.cards.splice(cardIndex, 1)[0];
    this.field.set(fieldIndex, card);
    return true;
  }

  removeCard(fieldIndex: number): void {
    if (this.field.get(fieldIndex)) this.field.delete(fieldIndex);
  }

  cardHealth(fieldIndex: number, amount: number): void {
    const card = this.field.get(fieldIndex);
    if (!card) return;
    card.health += amount;
    if (card.health <= 0) this.removeCard(fieldIndex);
  }

  attackCard(attacker: Card, fieldIndex: number): void {
    this.cardHealth(fieldIndex, -attacker.damage);
  }
}

export class GamePlayers {
  /**
   * Map of all players
   */
  map: Map<number, GamePlayer> = new Map<number, GamePlayer>();

  /**
   * Start index of the key for the `map`
   */
  static readonly _startIndex: number = 1;

  /**
   * Real index
   */
  _index: number = GamePlayers._startIndex;

  /**
   * Index of current player
   */
  get index(): number {
    return this._index;
  }
  set index(value: number) {
    if (value > this.map.size) this._index = GamePlayers._startIndex;
    else this._index = Math.max(GamePlayers._startIndex, value);
  }

  constructor(game: Game, players: GamePlayer[]) {
    let key = GamePlayers._startIndex;
    for (const player of players) {
      player.game = game;
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
