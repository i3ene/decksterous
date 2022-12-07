import { Component, Input, OnInit } from '@angular/core';
import { SocketSubscriptionKey } from 'src/app/models/object/service.model';
import { SocketService } from 'src/app/services/request/socket.service';

@Component({
  selector: 'app-lobby-room',
  templateUrl: './lobby-room.component.html',
  styleUrls: ['./lobby-room.component.scss']
})
export class LobbyRoomComponent {

  @Input() name?: string;

  constructor(public socket: SocketService) { }

  get SocketKey() {
    return SocketSubscriptionKey;
  }
}
