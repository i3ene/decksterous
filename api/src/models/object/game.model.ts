import EventEmitter from 'events';
import {Socket} from 'socket.io';
import {Card} from '../data/card.model';
import {Deck} from '../data/deck.model';
import {User} from '../data/user.model';
import {Game} from './game.object';
import {BackendAction, FrontendAction, SocketAction} from './socket.model';
import { _Object } from '../data/object.model';
import { SubInventory } from '../data/subInventory.model';

export enum GameEvent {
  START = 'start',
  TURN = 'turn',
  END = 'end',
}

export enum GameState {
  BEFORE = 'before',
  AT = 'at',
  AFTER = 'after',
}

export class GameEventSet {
  [GameEvent.START]: EventEmitter = new EventEmitter();
  [GameEvent.TURN]: EventEmitter = new EventEmitter();
  [GameEvent.END]: EventEmitter = new EventEmitter();
}

export class GameLogicState {
  event: GameEvent = GameEvent.START;
  state: GameState = GameState.BEFORE;
}

export interface GameRule {
  [key: string]: any;
}

export interface GameRuleSet {
  [GameState.BEFORE]: GameRule[];
  [GameState.AT]: GameRule[];
  [GameState.AFTER]: GameRule[];
}

export class GameRuleBook implements GameRuleSet {
  [GameState.BEFORE]: GameRule[] = [];
  [GameState.AT]: GameRule[] = [];
  [GameState.AFTER]: GameRule[] = [];

  game: Game;

  constructor(game: Game) {
    this.game = game;
  }

  addRule(state: GameState, rule: GameRule) {
    this[state].push(rule);
    // TODO: Add subscription/listener
  }
}

export class GamePlayer {
  /**
   * Current socket (does not need to be same as the active {@link socket socket})
   */
  _currentSocket!: Socket;
  _socket!: Socket;
  /**
   * (Active) socket connection of player
   */
  get socket(): Socket {
    return this._socket;
  }

  set socket(value: Socket) {
    // Set current socket
    this._currentSocket = value;
    // If no game instance, skip
    if (this.game == undefined) return;
    // Remove active listener
    if (this._socket) this._socket.removeListener(SocketAction.BACKEND, this.game.playerActionEventHandler);
    // Set active socket
    this._socket = value;
    // Set new listener
    if (value) {
      value.on(SocketAction.BACKEND, (event: any) =>
        this.game!.playerActionEventHandler(new GamePlayerEvent(this, event.action, event.args))
      );
    }
  }

  /**
   * User object of player
   */
  user: User;

  /**
   * Player health
   */
  health: number = 20;

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

  _fieldLength: number = 0;
  set fieldLength(value: number) {
    this._fieldLength = value;
    for (const key of this.field.keys()) {
      if (key > this.fieldLength) this.field.delete(key);
    }
  }

  get fieldLength(): number {
    return this._fieldLength;
  }

  /**
   * Player events
   */
  event: EventEmitter = new EventEmitter();

  _game?: Game;
  /**
   * Reference to the {@link Game game}
   */
  set game(value: Game | undefined) {
    this._game = value;
    // Re-trigger socket change to subscribe to new game instance evennt handler
    this.socket = this._currentSocket;
  }

  get game(): Game | undefined {
    return this._game;
  }

  /**
   * If player is ready
   */
  isReady: boolean = false;

  constructor(socket: Socket, user: User) {
    this.socket = socket;
    this.user = user;
    this.deck = [];
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
      this.emit(BackendAction.ERROR, {message: 'Please select a deck first!'});
      return false;
    }
    this.isReady = state;
    // Emit state change
    const event = {state: state};
    this.emit(BackendAction.READY_CHANGED, event, event);
    return true;
  }

  /**
   * Select a deck.
   * If deck does not exist or player is ready, it will not change deck.
   * @param deckHash Deck object hash
   * @returns `true` if deck was successfully loaded.
   */
  async selectDeck(deckHash: string): Promise<boolean> {
    if (this.isReady) {
      this.emit(BackendAction.ERROR, {message: `Deck cannot not be changed when ready!`});
      return false;
    }
    const deck: SubInventory | null = await SubInventory.scope("cardObjects").findOne({ where: { objectHash: deckHash } });
    if (!deck || !deck.objects || !deck.objects.length) {
      this.emit(BackendAction.ERROR, {message: `Deck ${deckHash} could not be selected or was empty!`});
      return false;
    }
    this.deck = deck.objects.map((x) => x.item?.card!);
    // Emit selection of deck
    const event = {deckHash: deckHash};
    this.emit(BackendAction.DECK_SELECTED, event);
    return true;
  }

  /**
   * Draw cards from the deck and put them into the players hand
   * @param amount Amount of cards to draw. (If deck runs empty it skips this)
   * @returns Array of drawn cards
   */
  drawCards(amount: number): Card[] {
    // Initialize result set
    const cards: Card[] = [];
    while (amount-- > 0) {
      // Remove card from deck
      const card = this.deck.splice(0, 1)[0];
      // Move it to the result set
      cards.push(card);
      // Emit drawn card
      this.emit(BackendAction.CARD_DRAWN, { card: card }, {card: {}});
    }
    // Add cards to hand
    this.cards.push(...cards);
    // Return drawn cards
    return cards;
  }

  /**
   * Place a card on the field. Will take the card out of the hand and put it onto the field.
   * @param cardIndex Index of card in hand
   * @param fieldIndex Index of field
   * @returns If `cardIndex` is out of bound or `fieldIndex` already has a card or is out of bound it will return `false` else `true`
   */
  placeCard(cardIndex: number, fieldIndex: number): boolean {
    // Check cardIndex and fieldIndex for out-of-bound values (return false on error)
    if (cardIndex > this.cards.length || this.game!.fieldSize <= fieldIndex || this.field.get(fieldIndex)) return false;
    // Remove card from hand at cardIndex
    const card = this.cards.splice(cardIndex, 1)[0];
    // Set removed card at fieldIndex
    this.field.set(fieldIndex, card);
    // Emit placed card
    const event = {fieldIndex: fieldIndex, cardIndex: cardIndex, card: card};
    this.emit(BackendAction.CARD_PLACED, event, event);
    // Return true for success
    return true;
  }

  /**
   * Remove a card from field and onto the graveyard.
   * @param fieldIndex Index of field
   */
  removeCard(fieldIndex: number): void {
    // Remove card from field at fieldIndex
    const card = this.field.get(fieldIndex);
    // Check for empty card
    if (!card) return;
    // Add removed card to grave
    this.grave.push(card);
    // Delete complete entry on field by fieldIndex
    this.field.delete(fieldIndex);
    // Emit deletion of card
    const event = {fieldIndex: fieldIndex};
    this.emit(BackendAction.CARD_REMOVED, event, event);
  }

  /**
   * Add/Remove health from card on the field. If health is lower or `0` it will automatically be removed.
   * @param fieldIndex Index on field
   * @param amount Health to add/remove
   */
  cardHealth(fieldIndex: number, amount: number): void {
    // Get card from field at fieldIndex
    const card = this.field.get(fieldIndex);
    // Check for empty card
    if (!card) {
      // Attack player
      this.playerHealth(amount);
      return;
    };
    // Add up amount to health
    card.health += amount;
    // Emit change of health
    const event = {fieldIndex: fieldIndex, card: card};
    this.emit(BackendAction.CARD_HEALTH_CHANGED, event, event);
    // If health less than 0, remove card
    if (card.health <= 0) this.removeCard(fieldIndex);
  }

  playerHealth(amount: number): void {
    this.health += amount;
    const event = { health: this.health };
    this.emit(BackendAction.CARD_HEALTH_CHANGED, event, event);
  }

  /**
   * Attack a card on field.
   * @param attacker Attacker card
   * @param fieldIndex Index of field
   */
  attackField(attacker: Card | undefined, fieldIndex: number, attackerIndex?: number): void {
    // Check for attacker card
    if (!attacker) return;
    // Emit attack of card
    const event = {fieldIndex: fieldIndex, attacker: attacker, attackerIndex: attackerIndex ?? fieldIndex};
    this.emit(BackendAction.CARD_ATTACKED, event, event);
    // Subtract health of field card by attacker damage
    this.cardHealth(fieldIndex, -attacker.damage);
  }

  /**
   * Synchronize player data
   * @returns Player data
   */
  sync() {
    const event = {
      playerIndex: this.game?.players.find(this),
      currentIndex: this.game?.players.index,
      cards: this.cards,
      field: Array(this.fieldLength),
      deck: Array(this.deck.length),
      health: this.health
    };
    this.emit(BackendAction.SYNC, event, Object.assign(event, {cards: Array(event.cards.length)}));
    return event;
  }

  /**
   * Emit an event
   * @param action The action identifier
   * @param playerArgs Arguments send to the player directly
   * @param allArgs Arguments send to everyone else (except the player)
   */
  emit(action: BackendAction, playerArgs: any, allArgs?: any) {
    // Emit directly to player
    this.socket.emit(SocketAction.FRONTEND_PLAYER, {action: action, args: playerArgs} as GamePlayerEvent);
    // (If set) emit to everyone else (except player itself)
    if (allArgs) this.event.emit(SocketAction.INTERNAL, {action: action, args: allArgs} as GamePlayerEvent);
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
    this.addListeners(game);
  }

  addListeners(game: Game) {
    game.events[GameEvent.START].on(GameState.AFTER, (event: any) => {
      this.setFieldLength(5);
      this.sync();
    });
    game.events[GameEvent.TURN].on(GameState.AFTER, (event: any) => {
      this.attack(this.next, this.current);
    });
  }

  setFieldLength(length: number) {
    this.map.forEach(x => x.fieldLength = length);
  }

  /**
   * Add players to the list.
   * (If player is already in the list, it will be replaced by the new instance)
   * @param player Player to add
   */
  add(player: GamePlayer) {
    // Add game instance to player
    player.game = this.game;
    // Add listener to player events
    player.event.addListener(SocketAction.INTERNAL, (event) => this.eventHandler(player, event));
    // Add player to set (if player already exist, fetch id)
    this.map.set(this.find(player) ?? this.map.size, player);
  }

  /**
   * Remove player from list.
   * (Map gets rearranged to adjust indices of the map)
   * @param player Player instance or map key
   */
  remove(player: number | GamePlayer): void {
    // Remove player from map
    if (typeof player == 'number') this.map.delete(player);
    else this.map.delete(this.find(player)!);

    // Initialize empty result
    const players = [];
    // Retrieve all players from old map
    for (const entry of this.map.values()) players.push(entry);
    // Create new map
    this.map = new Map();
    // Add players
    for (const entry of players) this.add(entry);
  }

  /**
   * Find key by player instance oder id
   * @param player Player instance or id
   * @returns Found key number else `undefined`
   */
  find(player: GamePlayer | number): number | undefined {
    // Fetch an id if exists
    const id = typeof player == 'number' ? player : player.user.id;
    // Iterate through every key of map
    for (const key of this.map.keys()) {
      // Retrieve object from map by key
      const temp = this.map.get(key);
      // Skip on no entry
      if (!temp) continue;
      // Check id and return key on match
      if (temp.user.id == id) return key;
    }
    // Return default undefined
    return undefined;
  }

  /**
   * Get player instance by id
   * @returns Found player instance else `undefined`
   * @param id Player id
   */
  get(id: number): GamePlayer | undefined {
    // Get key by id
    const key = this.find(id);
    // Return undefined on no key
    if (!key) return undefined;
    // Return player instance on key
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
      if (index >= this.map.size) index = 0;
      else if (index < 0) index = this.map.size - 1;
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
    // Increment player turn index
    ++this.index;
    // Emit turn change
    const event = {action: BackendAction.TURN_CHANGED, args: {currentIndex: this.index}} as GamePlayerEvent;
    this.events.emit(SocketAction.INTERNAL, event);
    // Return current player turn index
    return this.index;
  }

  /**
   * Check if every player is ready.
   * (Need to be atleast 2 player.)
   * @returns `true` if everyone is ready.
   */
  areReady(): boolean {
    // Check if atleast two players
    if (this.map.size < 2) return false;
    // Iterate through every player
    for (const player of this.map.values()) {
      // If player is not ready, return false
      if (!player.isReady) return false;
    }
    // Return true for every player is ready
    return true;
  }

  /**
   * Do attack turn
   */
  attack(attacker: GamePlayer, target: GamePlayer): void {
    for (const [index, card] of attacker.field) {
      target.attackField(card, target.fieldLength - index - 1);
    }
  }

  /**
   * Synchornize every player data
   */
  sync() {
    this.map.forEach(x => x.sync());
  }

  /**
   * Bubble events from players
   * @param player Initiator
   * @param event Event data
   */
  eventHandler(player: GamePlayer, event: GamePlayerEvent) {
    // Add player caller object
    event.player = player;
    event.args.playerIndex = this.find(player);
    // Emit internal event
    this.events.emit(SocketAction.INTERNAL, event);
  }
}

export interface GamePlayerEvent {
  playerIndex?: number;
  player: GamePlayer;
  action: FrontendAction | BackendAction;
  args: any | any[];
}

export class GamePlayerEvent implements GamePlayerEvent {
  constructor(player: GamePlayer, action: FrontendAction, args?: any) {
    this.player = player;
    this.action = action;
    this.args = args ?? {};
  }
}
