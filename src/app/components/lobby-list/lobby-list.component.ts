import { Component, OnInit } from '@angular/core';
import { SocketKey } from 'src/app/models/object/service.model';
import { SocketService } from 'src/app/services/request/socket.service';

@Component({
  selector: 'app-lobby-list',
  templateUrl: './lobby-list.component.html',
  styleUrls: ['./lobby-list.component.scss']
})
export class LobbyListComponent {

  constructor(public socket: SocketService) { }

  get SocketKey() {
    return SocketKey;
  }

}
