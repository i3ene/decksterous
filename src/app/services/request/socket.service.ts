import { Injectable } from '@angular/core';
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

  /**
   * List of all room members
   */
  roomMembers!: string[];

  /**
   * List of currently available rooms
   */
  availableRooms!: string[];

  /**
   * Active listeners (for room and game) 
   */
  subscriptions: Map<string, Subscription> = new Map();


  constructor(public socket: SocketConnection) {
    this.socket.fromEvent<any>('game_socket_join').subscribe((message) => this.addMessage(message));
    this.socket.fromEvent<any>('game_socket_leave').subscribe((message) => this.addMessage(message));
    this.socket.fromEvent<any>('room_socket_join').subscribe((message) => this.addMessage(message));
    this.socket.fromEvent<any>('room_socket_leave').subscribe((message) => this.addMessage(message));
    this.socket
      .fromEvent<any>('room_socket_list')
      .subscribe((data) => (this.roomMembers = data[Object.keys(data)[0]]));
    this.socket.fromEvent<any>('room_list').subscribe((list) => (this.availableRooms = list));
  }

  /**
   * Join a room
   * @param room Room to join
   */
  joinRoom(room: string) {
    this.leaveRoom();
    this._join(SocketSubscriptionKey.ROOM, room);
  }

  /**
   * Join the game in the current room
   */
  joinGame() {
    if (!this.subscriptions.get(SocketSubscriptionKey.ROOM)) return;
    this._join(SocketSubscriptionKey.GAME);
  }

  /**
   * Emit join and add subscription
   * @param key Type of event
   * @param arg Additional arguments
   */
  _join(key: SocketSubscriptionKey, arg?: any) {
    this.socket.emit(key + '_join', arg);
    let sub = this.socket.fromEvent<any>(key + '_socket_event').subscribe((event) => this.addEvent(arg ?? key, event));
    this.subscriptions.set(key, sub);
  }

  /**
   * Leave a room
   * @param room Room to leave
   */
  leaveRoom() {
    this.roomMembers = [];
    this._leave(SocketSubscriptionKey.GAME);
    this._leave(SocketSubscriptionKey.ROOM);
  }

  /**
   * Leave the game in the current room
   */
  leaveGame() {
    this._leave(SocketSubscriptionKey.GAME);
  }

  /**
   * Emit leave and delete subscription
   * @param key Type of event
   * @param arg Additional arguments
   */
  _leave(key: SocketSubscriptionKey, args?: any) {
    if (!this.subscriptions.get(key)) return;
    this.socket.emit(key + '_leave', args);
    this.subscriptions.get(key)?.unsubscribe();
    this.subscriptions.delete(key);
  }

  /**
   * Emit a custom event
   * @param name Event name
   * @param data Event payload
   */
  emitEvent(name: string, data: string) {
    this.socket.emit(name, JSON.parse(data));
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

}
