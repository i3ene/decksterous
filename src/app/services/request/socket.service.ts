import { Injectable } from '@angular/core';
import { RoomSocketEvent } from 'api/src/models/object/socket.model';
import { Observable, Subscription } from 'rxjs';
import { SocketKey } from 'src/app/models/object/service.model';
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

  constructor(public socket: SocketConnection) {}

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
}
