import EventEmitter from 'events';
import { BroadcastOperator, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Card } from '../data/card.model';
import { User } from '../data/user.model';
import { Game } from './game.object';
import { GameAction } from './socket.model';

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

export class GameLogicState {
  event: GameEvent = GameEvent.START;
  state: GameEventState = GameEventState.BEFORE;
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
   * Cards on the graveyard
   */
  grave: Card[] = [];

  /**
   * Cards on field
   */
  field: Map<number, Card> = new Map<number, Card>();

  /**
   * Player events
   */
  event: EventEmitter = new EventEmitter();

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
      this.event.emit(GameAction.CARD, null); //TODO: emit drawing of card
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
    this.event.emit(GameAction.CARD, null); //TODO: emit placing of card
    return true;
  }

  /**
   * Remove a card from field and onto the graveyard.
   * @param fieldIndex Index of field
   */
  removeCard(fieldIndex: number): void {
    const card = this.field.get(fieldIndex);
    if (!card) return;
    this.grave.push(card);
    this.field.delete(fieldIndex);
    this.event.emit(GameAction.CARD, null); //TODO: emit death of card
  }

  /**
   * Add/Remove health from card on the field. If health is lower or `0` it will automatically be removed.
   * @param fieldIndex Index on field
   * @param amount Health to add/remove
   */
  cardHealth(fieldIndex: number, amount: number): void {
    const card = this.field.get(fieldIndex);
    if (!card) return;
    card.health += amount;
    this.event.emit(GameAction.CARD, null); //TODO: emit new health of card
    if (card.health <= 0) this.removeCard(fieldIndex);
  }

  /**
   * Attack a card on field.
   * @param attacker Attacker card
   * @param fieldIndex Index of field
   */
  attackCard(attacker: Card | undefined, fieldIndex: number): void {
    if (!attacker) return;
    this.event.emit(GameAction.CARD, null); //TODO: emit card attack
    this.cardHealth(fieldIndex, -attacker.damage);
  }
}

export class GamePlayers {
  /**
   * Map of all players
   */
  map: Map<number, GamePlayer> = new Map<number, GamePlayer>();

  /**
   * Player events
   */
   events: EventEmitter = new EventEmitter();

  /**
   * Real index
   */
  _index: number = 0;

  /**
   * Index of current player
   */
  get index(): number {
    return this._index;
  }
  set index(value: number) {
    this._index = this.bound(value);
  }

  /**
   * Retrieve next active player
   * @returns next player
   */
  get next(): GamePlayer {
    return this.map.get(this.bound(this.index + 1))!;
  }

  /**
   * Retrieve current active player
   * @returns current player
   */
  get current(): GamePlayer {
    return this.map.get(this.index)!;
  }

  constructor(game: Game, players: GamePlayer[]) {
    let key = 0;
    for (const player of players) {
      player.game = game;
      this.map.set(key++, player);
    }
  }

  /**
   * Bound an index number to max player size
   * @param value Value to bound
   * @returns Number in bounds
   */
  bound(value: number): number {
    let index = 0;
    while (value != 0) {
      let increment = value > 0 ? -1 : 1;
      index -= increment;
      if (index > this.map.size) index = 0;
      else if (index < 0) index = this.map.size;
      value += increment;
    }
    return index;
  }

  /**
   * Increments to next player index.
   * (Rolls back if out of bound.)
   * @returns current `index`
   */
  turn(): number {
    ++this.index;
    this.events.emit(GameAction.GAME, null); //TODO: emit next player turn
    return this.index;
  }

  /**
   * Bubble events from players
   * @param player Initiator
   * @param event Event symbol
   * @param args Event data
   */
  eventHandler(player: GamePlayer, event: any, args: any[]) {
    this.events.emit(event, { player, args } as GamePlayerEvent);
  }
}

export interface GamePlayerEvent {
  player: GamePlayer;
  args: any | any[];
}
