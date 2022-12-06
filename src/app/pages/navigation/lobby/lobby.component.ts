import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewLobbyDialogue } from 'src/app/dialogues/new-lobby/new-lobby.component';
import { SocketSubscriptionKey } from 'src/app/models/object/service.model';
import { SocketService } from 'src/app/services/request/socket.service';

@Component({
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyPage {

  constructor(public socket: SocketService, private dialog: MatDialog) { }

  createLobby() {
    const dialog = this.dialog.open(NewLobbyDialogue);
    dialog.afterClosed().subscribe(event => {
      if (event != 'Create') return;
      const room = dialog.componentInstance.name;
      this.socket.join(SocketSubscriptionKey.ROOM, room);
    });
  }
}
