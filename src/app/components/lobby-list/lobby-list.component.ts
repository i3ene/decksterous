import { Component, OnInit } from '@angular/core';
import { SocketKey } from 'src/app/models/object/service.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-lobby-list',
  templateUrl: './lobby-list.component.html',
  styleUrls: ['./lobby-list.component.scss']
})
export class LobbyListComponent {

  constructor(public socket: RoomService) { }

  get SocketKey() {
    return SocketKey;
  }

}
