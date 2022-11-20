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
  CARD = 'card'
}

export class GameActionEvent {
  [key: string]: any;
}