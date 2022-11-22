import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
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
   * Currently joined rooms
   */
  joinedRooms: Map<string, any> = new Map();

  /**
   * List of currently available rooms
   */
  availableRooms!: string[];

  /**
   * Active listeners for individual rooms
   */
  subscriptions: Map<string, Subscription> = new Map();

  constructor(public socket: SocketConnection) {
    this.socket.fromEvent<any>('room_socket_join').subscribe((message) => this.addMessage(message));
    this.socket.fromEvent<any>('room_socket_leave').subscribe((message) => this.addMessage(message));
    this.socket
      .fromEvent<any>('room_socket_list')
      .subscribe((data) => this.joinedRooms.set(Object.keys(data)[0], data[Object.keys(data)[0]]));
    this.socket.fromEvent<any>('room_list').subscribe((list) => (this.availableRooms = list));
  }

  /**
   * Join a room (additionally)
   * @param room Room to join
   */
  joinRoom(room: string) {
    this.socket.emit('room_join', room);
    let sub = this.socket.fromEvent<any>('room_socket_event_' + room).subscribe((event) => this.addEvent(room, event));
    this.subscriptions.set(room, sub);
  }

  /**
   * Leave a room
   * @param room Room to leave
   */
  leaveRoom(room: string) {
    console.log(this.joinedRooms);
    this.joinedRooms.delete(room);
    this.socket.emit('room_leave', room);
    this.subscriptions.get(room)?.unsubscribe();
    this.subscriptions.delete(room);
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
