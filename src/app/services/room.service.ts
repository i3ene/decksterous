import { Injectable } from '@angular/core';
import { SocketConnection } from './request/socket.connection';
import { RoomSocketEvent } from 'api/src/models/object/socket.model';
import { SocketKey } from '../models/object/service.model';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  observables: Map<SocketKey, Observable<any>> = new Map();
  subscriptions: Map<SocketKey, Subscription> = new Map();

  names: Map<SocketKey, string> = new Map();

  rooms: Map<string, any> = new Map();

  constructor(public socket: SocketConnection) {
    this.socket
      .fromEvent<any>('game_socket_join')
      .subscribe((event: RoomSocketEvent) => this.joinHandler(SocketKey.GAME, event));
    this.socket
      .fromEvent<any>('game_socket_leave')
      .subscribe((event: RoomSocketEvent) => this.leaveHandler(SocketKey.GAME, event));
    this.socket
      .fromEvent<any>('room_socket_join')
      .subscribe((event: RoomSocketEvent) => this.joinHandler(SocketKey.ROOM, event));
    this.socket
      .fromEvent<any>('room_socket_leave')
      .subscribe((event: RoomSocketEvent) => this.leaveHandler(SocketKey.ROOM, event));
    this.socket.fromEvent<any>('room_socket_list').subscribe((collection: any) => this.membersHandler(collection));
    this.socket.fromEvent<any>('room_list').subscribe((collection: any) => this.roomsHandler(collection));
  }


  joinHandler(key: SocketKey, event: RoomSocketEvent) {
    const sub = this.subscriptions.get(key);
    if (sub) sub.unsubscribe();
    this.subscriptions.set(key, this.createSubscription(key));
    this.names.set(key, event.room);
  }

  leaveHandler(key: SocketKey, event: RoomSocketEvent) {
    const sub = this.subscriptions.get(key);
    if (sub) sub.unsubscribe();
    this.subscriptions.delete(key);
    this.names.delete(key);
  }

  membersHandler(collection: any) {
    for (const room of Object.keys(collection)) {
      this.rooms.set(room, collection[room]);
    }
  }

  roomsHandler(collection: any) {
    const rooms = Object.keys(collection);
    const keys = Array.from(this.rooms.keys());

    let outdated = keys.filter((x) => !rooms.includes(x));
    for (const room of outdated) this.rooms.delete(room);

    for (const room of rooms) this.rooms.set(room, collection[room]);
  }

  isIn(key: SocketKey): boolean {
    return !!this.subscriptions.get(key);
  }

  join(key: SocketKey, room?: string) {
    this.socket.emit(key + '_join', room);
  }

  leave(key: SocketKey) {
    this.socket.emit(key + '_leave');
  }

  createSubscription(key: SocketKey) {
    const obs = this.socket.fromEvent<any>(key + '_socket_event');
    this.observables.set(key, obs);
    return obs.subscribe((event) => console.log(key, event));
  }

  /**
   * Emit a custom event
   * @param name Event name
   * @param data Event payload
   */
  emit(name: string, data: string | any) {
    this.socket.emit(name, typeof data == 'string' ? JSON.parse(data) : data);
  }
  
}
