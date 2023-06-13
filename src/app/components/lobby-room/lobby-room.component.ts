import { Component, Input, OnInit } from '@angular/core';
import { SocketKey } from 'src/app/models/object/service.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-lobby-room',
  templateUrl: './lobby-room.component.html',
  styleUrls: ['./lobby-room.component.scss']
})
export class LobbyRoomComponent {

  @Input() name?: string;

  constructor(public room: RoomService) { }

  get SocketKey() {
    return SocketKey;
  }
}
