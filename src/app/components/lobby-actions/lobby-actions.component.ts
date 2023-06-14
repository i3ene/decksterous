import { Component } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { NewLobbyDialogue } from 'src/app/dialogues/new-lobby/new-lobby.component';
import { SocketKey } from 'src/app/models/object/service.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-lobby-actions',
  templateUrl: './lobby-actions.component.html',
  styleUrls: ['./lobby-actions.component.scss']
})
export class LobbyActionsComponent {

  constructor(public room: RoomService, private dialog: MatDialog) { }

  createLobby() {
    const dialog = this.dialog.open(NewLobbyDialogue);
    dialog.afterClosed().subscribe(event => {
      if (event != 'Create') return;
      const room = dialog.componentInstance.name;
      this.room.join(SocketKey.ROOM, room);
      this.room.join(SocketKey.GAME, room);
    });
  }

}
