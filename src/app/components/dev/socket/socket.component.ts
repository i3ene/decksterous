import { Component } from '@angular/core';
import { SocketConnection } from 'src/app/services/request/socket.connection';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.scss']
})
export class SocketComponent {

  message!: string;
  joinedRooms: any = {};
  rooms!: any;
  data!: any;

  constructor(private socket: SocketConnection) {
    this.socket.fromEvent<any>("room_socket_join").subscribe(message => this.message = message);
    this.socket.fromEvent<any>("room_socket_leave").subscribe(message => this.message = message);
    this.socket.fromEvent<any>("room_socket_list").subscribe(data => this.joinedRooms[Object.keys(data)[0]] = data[Object.keys(data)[0]]);
    this.socket.fromEvent<any>("room_list").subscribe(list => this.rooms = list);
  }

  joinRoom(room: string) {
    this.socket.emit("room_join", room);
  }

  leaveRoom(room: string) {
    delete this.joinedRooms[room];
    this.socket.emit("room_leave", room);
  }

  emitEvent(name: string, data: string) {
    this.socket.emit(name, JSON.parse(data));
  }

}
