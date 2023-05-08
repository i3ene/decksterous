export enum RoomAction {
  JOIN = 'joined',
  LEAVE = 'left',
}

export class RoomSocketEvent {
  socket: string;
  room: string;
  action: RoomAction;

  constructor(socket: string, room: string, action: RoomAction) {
    this.socket = socket;
    this.room = room;
    this.action = action;
  }
}

/**
 * Actions from the backend (to the frontend)
 */
export enum BackendAction {
  ERROR = 'error',
  SYNC = 'sync',
  READY_CHANGED = 'ready_changed',
  CARD_HEALTH_CHANGED = 'card_health_changed',
  CARD_REMOVED = 'card_removed',
  CARD_ATTACKED = 'card_attacked',
  CARD_DRAWN = 'card_drawn',
  CARD_PLACED = 'card_placed',
  DECK_SELECTED = 'deck_selected',
  TURN_CHANGED = 'turn_changed',
}

/**
 * Actions from the frontend (to the backend)
 */
export enum FrontendAction {
  SET_READY = 'set_ready',
  SELECT_DECK = 'select_deck',
  DRAW_CARD = 'draw_card',
  PLACE_CARD = 'place_card',
  END_TURN = 'end_turn',
}

export enum SocketAction {
  ROOM = 'room_',
  ROOM_SERVER = 'room_event',
  ROOM_LIST = 'room_list',
  ROOM_JOIN = 'room_join',
  ROOM_LEAVE = 'room_leave',
  ROOM_SOCKET = 'room_socket_event',
  ROOM_SOCKET_LIST = 'room_socket_list',
  ROOM_SOCKET_JOIN = 'room_socket_join',
  ROOM_SOCKET_LEAVE = 'room_socket_leave',
  GAME = 'game_',
  GAME_SERVER = 'game_event',
  GAME_JOIN = 'game_join',
  GAME_LEAVE = 'game_leave',
  GAME_SOCKET = 'game_socket_event',
  GAME_SOCKET_JOIN = 'game_socket_join',
  GAME_SOCKET_LEAVE = 'game_socket_leave',
  /**
   * Event to frontend application (on event change)
   */
  FRONTEND_EVENT = 'frontend_event',
  /**
   * Response to frontend application (for everyone)
   */
  FRONTEND_ALL = 'frontend_all',
  /**
   * Response to frontend application (directly to player)
   */
  FRONTEND_PLAYER = 'frontend_player',
  /**
   * Result to backend from frontend (event from player)
   */
  BACKEND = 'backend',
  /**
   * Response to internal logic (backend to backend)
   */
  INTERNAL = 'internal',
}
