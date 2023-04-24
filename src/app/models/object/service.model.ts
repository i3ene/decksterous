export interface InputServiceEvent {
  source: any;
  data: any;
}

export enum SocketKey {
  ROOM = 'room',
  GAME = 'game'
}