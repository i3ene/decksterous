import { Component } from '@angular/core';
import { SocketKey } from 'src/app/models/object/service.model';
import { SocketService } from 'src/app/services/request/socket.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'dev-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.scss'],
})
export class DevSocketComponent {
  constructor(public room: RoomService, public socket: SocketService) { }

  get SocketKey() {
    return SocketKey;
  }
}
