import { Injectable } from '@angular/core';
import { RoomSocketEvent } from 'api/src/models/object/socket.model';
import { Subscription } from 'rxjs';
import { SocketSubscriptionKey } from 'src/app/models/object/service.model';
import { SocketConnection } from './socket.connection';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  /**
   * Collection of received messages
   */
  messages: { timestamp: Date; message: any }[] = [];

  /**
   * Collection of received events (by individual rooms)
   */
  events: { timestamp: Date; room: string; event: any }[] = [];


  subscriptions: Map<SocketSubscriptionKey, Subscription> = new Map();

  names: Map<SocketSubscriptionKey, string> = new Map();

  rooms: Map<string, any> = new Map();

  constructor(public socket: SocketConnection) {
    this.socket.fromEvent<any>('game_socket_join').subscribe((event: RoomSocketEvent) => this.joinHandler(SocketSubscriptionKey.GAME, event));
    this.socket.fromEvent<any>('game_socket_leave').subscribe((event: RoomSocketEvent) => this.leaveHandler(SocketSubscriptionKey.GAME, event));
    this.socket.fromEvent<any>('room_socket_join').subscribe((event: RoomSocketEvent) => this.joinHandler(SocketSubscriptionKey.ROOM, event));
    this.socket.fromEvent<any>('room_socket_leave').subscribe((event: RoomSocketEvent) => this.leaveHandler(SocketSubscriptionKey.ROOM, event));
    this.socket
      .fromEvent<any>('room_socket_list')
      .subscribe((collection: any) => this.membersHandler(collection));
    this.socket.fromEvent<any>('room_list').subscribe((rooms: string[]) => this.roomsHandler(rooms));
  }

  /**
   * Emit a custom event
   * @param name Event name
   * @param data Event payload
   */
  emitEvent(name: string, data: string | any) {
    this.socket.emit(name, typeof data == 'string' ? JSON.parse(data) : data);
  }

  /**
   * Add a socket server message
   * @param message Server message
   */
  addMessage(message: any) {
    this.messages.push({ timestamp: new Date(), message: message });
  }

  /**
   * Add a socket room event
   * @param room Room name from source
   * @param event Event from room
   */
  addEvent(room: string, event: any) {
    this.events.push({ timestamp: new Date(), room: room, event: event });
  }


  join(key: SocketSubscriptionKey, room?: string) {
    this.socket.emit(key + '_join', room);
  }

  leave(key: SocketSubscriptionKey) {
    this.socket.emit(key + '_leave');
  }


  createSubscription(key: SocketSubscriptionKey) {
    return this.socket.fromEvent<any>(key + '_socket_event').subscribe((event) => this.addEvent(key, event));
  }

  joinHandler(key: SocketSubscriptionKey, event: RoomSocketEvent) {
    const sub = this.subscriptions.get(key);
    if (sub) sub.unsubscribe();
    this.subscriptions.set(key, this.createSubscription(key));
    this.names.set(key, event.room);
  }

  leaveHandler(key: SocketSubscriptionKey, event: RoomSocketEvent) {
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

  roomsHandler(rooms: string[]) {
    const keys = Array.from(this.rooms.keys());

    let outdated = rooms.filter(x => !keys.includes(x));
    for (const room of outdated) this.rooms.delete(room);

    let updated =  keys.filter(x => !rooms.includes(x));
    for (const room of updated) this.rooms.set(room, []);
  }
}
