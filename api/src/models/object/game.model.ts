import EventEmitter from 'events';
import { BroadcastOperator, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import { Card } from '../data/card.model';
import { CardDeck } from '../data/cardDeck.model';
import { User } from '../data/user.model';
import { Game } from './game.object';
import { GameAction, GameActionEvent, SocketAction } from './socket.model';

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
  _socket!: Socket;
  get socket(): Socket {
    return this._socket;
  }
  set socket(value: Socket) {
    if (this._socket) this._socket.removeListener(SocketAction.GAME_SERVER, this.handleEvent);
    this._socket = value;
    value.on(SocketAction.GAME_SERVER, this.handleEvent.bind(this));
  }

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

  /**
   * If player is ready
   */
  isReady: boolean = false;

  constructor(socket: Socket, user: User) {
    this.socket = socket;
    this.user = user;
    this.deck = [];
  }

  handleEvent(event: any) {
    switch (event.action) {
      case GameActionEvent.SELECT_DECK:
        this.selectDeck(event.deckId);
        break;
      case GameActionEvent.SET_READY:
        this.setReady(event.state);
        break;
    }
  }

  /**
   * Set ready state of player.
   * (If deck is empty, it will not set the ready state)
   * @param state Is ready
   * @returns `false` if deck is empty when setting ready
   */
  setReady(state: boolean): boolean {
    if (this.isReady == state) return true;
    if (state && this.deck.length == 0) {
      this.socket.emit(SocketAction.GAME_SOCKET, "Please select a deck first!");
      return false;
    }
    this.isReady = state;
    this.event.emit(GameAction.PLAYER, new GamePlayerEvent(this, GameAction.PLAYER_READY, state));
    return true;
  }

  /**
   * Select a deck.
   * If deck does not exist or player is ready, it will not change deck.
   * @param deckId Deck id
   * @returns `true` if deck was successfully loaded.
   */
  async selectDeck(deckId: number): Promise<boolean> {
    if (this.isReady) {
      this.socket.emit(SocketAction.GAME_SOCKET, `Deck cannot not be changed when ready!`);
      return false;
    }
    const deck: CardDeck | null = await CardDeck.scope(['gameDeck']).findByPk(deckId);
    if (!deck || !deck.inventoryItems) {
      this.socket.emit(SocketAction.GAME_SOCKET, `Deck ${deckId} could not be selected or was empty!`);
      return false;
    }
    this.deck = deck.inventoryItems.map(x => x.item?.card!);
    this.socket.emit(SocketAction.GAME_SOCKET, `Deck ${deckId} selected.`);
    return true;
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

export class GamePlayerCollection {
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

  /**
   * Reference to the game
   */
   game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  /**
   * Add players to the list.
   * (If player is already in the list, it will be replaced by the new instance)
   * @param player Player to add
   */
  add(player: GamePlayer) {
    player.game = this.game;
    player.event.addListener(GameAction.PLAYER, (event) => this.eventHandler(GameAction.PLAYER, event));
    this.map.set(this.find(player) ?? this.map.size + 1, player);
  }

  /**
   * Remove player from list.
   * (Map gets rearranged to adjust indices of the map)
   * @param player Player instance or map key
   */
  remove(player: number | GamePlayer): void {
    if (typeof player == 'number') this.map.delete(player);
    else this.map.delete(this.find(player)!);

    const players = [];
    for(const entry of this.map.values()) players.push(entry);
    this.map = new Map();
    for (const entry of players) this.add(entry);
  }

  /**
   * Find key by player instance oder id
   * @param player Player instance or id
   * @returns Found key number else `undefined`
   */
  find(player: GamePlayer | number): number | undefined {
    const id = typeof player == "number" ? player : player.user.id;
    for(const key of this.map.keys()) {
      const temp = this.map.get(key);
      if (!temp) continue;
      if (temp.user.id == id) return key;
    }
    return undefined;
  }

  /**
   * Get player instance by id
   * @param player Player id
   * @returns Found player instance else `undefined`
   */
  get(id: number): GamePlayer | undefined {
    const key = this.find(id);
    if (!key) return undefined;
    else return this.map.get(key);
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
   * Check if every player is ready.
   * (Need to be atleast 2 player.)
   * @returns `true` if everyone is ready.
   */
  areReady(): boolean {
    if (this.map.size < 2) return false;
    for(const player of this.map.values()) {
      if (!player.isReady) return false;
    }
    return true;
  }

  /**
   * Bubble events from players
   * @param player Initiator
   * @param event Event symbol
   * @param args Event data
   */
  eventHandler(action: GameAction,  event: GamePlayerEvent) {
    this.events.emit(action, event);
  }
}

export interface GamePlayerEvent {
  player?: GamePlayer;
  action: GameAction;
  args?: any | any[];
}


export class GamePlayerEvent implements GamePlayerEvent {
  constructor(player: GamePlayer, action: GameAction, args?: any) {
    this.player = player;
    this.action = action;
    if (args) this.args = args;
  }
}
