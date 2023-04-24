import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewLobbyDialogue } from 'src/app/dialogues/new-lobby/new-lobby.component';
import { SocketKey } from 'src/app/models/object/service.model';
import { SocketService } from 'src/app/services/request/socket.service';

@Component({
  selector: 'app-lobby-actions',
  templateUrl: './lobby-actions.component.html',
  styleUrls: ['./lobby-actions.component.scss']
})
export class LobbyActionsComponent {

  constructor(public socket: SocketService, private dialog: MatDialog) { }

  createLobby() {
    const dialog = this.dialog.open(NewLobbyDialogue);
    dialog.afterClosed().subscribe(event => {
      if (event != 'Create') return;
      const room = dialog.componentInstance.name;
      this.socket.join(SocketKey.ROOM, room);
    });
  }

}
