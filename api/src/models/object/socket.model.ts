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

export enum FrontendAction {
  ERROR = 'error',
  SET_READY = 'set_ready',
  PLAYER_READY = 'player_ready',
  SELECT_DECK = 'select_deck',
  DRAW_CARD = 'draw_card',
  PLACE_CARD = 'place_card',
  REMOVE_CARD = 'remove_card',
  CARD_HEALTH = 'card_health',
  CARD_ATTACK = 'card_attack',
  TURN_CHANGE = 'turn_change',
  TURN_END = 'turn_end',
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
