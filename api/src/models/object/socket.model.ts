export enum RoomAction {
  JOIN = 'joined',
  LEAVE = 'left'
}

export class RoomActionEvent {
  socket: string;
  room: string;
  action: RoomAction;

  constructor(socket: string, room: string, action: RoomAction) {
    this.socket = socket;
    this.room = room;
    this.action = action;
  }
}

export enum GameAction {
  GAME = 'game',
  PLAYER = 'player',
  PLAYER_READY = 'player_ready',
  CARD = 'card'
}

export enum GameActionEvent {
  SELECT_DECK = "select_deck",
  SET_READY = "set_ready"
}

export enum SocketEvent {
  ROOM = "room_",
  ROOM_SERVER = 'room_event',
  ROOM_LIST = 'room_list',
  ROOM_JOIN = 'room_join',
  ROOM_LEAVE = 'room_leave',
  ROOM_SOCKET = 'room_socket_event',
  ROOM_SOCKET_LIST = 'room_socket_list',
  ROOM_SOCKET_JOIN = 'room_socket_join',
  ROOM_SOCKET_LEAVE = 'room_socket_leave',
  GAME = "game_",
  GAME_SERVER = 'game_event',
  GAME_JOIN = 'game_join',
  GAME_LEAVE = 'game_leave',
  GAME_SOCKET = 'game_socket_event',
  GAME_SOCKET_JOIN = 'game_socket_join',
  GAME_SOCKET_LEAVE = 'game_socket_leave',
}