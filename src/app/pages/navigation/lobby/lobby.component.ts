import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewLobbyDialogue } from 'src/app/dialogues/new-lobby/new-lobby.component';
import { SocketKey } from 'src/app/models/object/service.model';
import { SocketService } from 'src/app/services/request/socket.service';

@Component({
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyPage {

  constructor(public socket: SocketService) { }

  get SocketKey() {
    return SocketKey;
  }
}
