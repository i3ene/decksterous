export interface InputServiceEvent {
  source: any;
  data: any;
}

export enum SocketSubscriptionKey {
  ROOM = 'room',
  GAME = 'game'
}