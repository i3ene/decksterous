import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketConnection } from 'src/app/services/request/socket.connection';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.scss'],
})
export class SocketComponent {
  messages: { timestamp: Date, message: any }[] = [];
  joinedRooms: any = {};
  availableRooms!: any;
  events: { timestamp: Date, room: string, event: any }[] = [];
  subcsriptions: Map<string, Subscription> = new Map();

  constructor(private socket: SocketConnection) {
    this.socket.fromEvent<any>('room_socket_join').subscribe((message) => this.addMessage(message));
    this.socket.fromEvent<any>('room_socket_leave').subscribe((message) => this.addMessage(message));
    this.socket
      .fromEvent<any>('room_socket_list')
      .subscribe((data) => (this.joinedRooms[Object.keys(data)[0]] = data[Object.keys(data)[0]]));
    this.socket.fromEvent<any>('room_list').subscribe((list) => (this.availableRooms = list));
  }

  joinRoom(room: string) {
    this.socket.emit('room_join', room);
    let sub = this.socket
      .fromEvent<any>('room_socket_event_' + room)
      .subscribe((event) => this.addEvent(room, event));
    this.subcsriptions.set(room, sub);
  }

  leaveRoom(room: string) {
    delete this.joinedRooms[room];
    this.socket.emit('room_leave', room);
    this.subcsriptions.get(room)?.unsubscribe();
    this.subcsriptions.delete(room);
  }

  emitEvent(name: string, data: string) {
    this.socket.emit(name, JSON.parse(data));
  }

  addMessage(message: any) {
    this.messages.push({ timestamp: new Date, message: message });
  }

  addEvent(room: string, event: any) {
    this.events.push({ timestamp: new Date(), room: room, event: event })
  }
}
