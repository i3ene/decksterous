import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { Subscription } from 'rxjs';
import { NewLobbyDialogue } from 'src/app/dialogues/new-lobby/new-lobby.component';
import { SocketKey } from 'src/app/models/object/service.model';
import { GameService } from 'src/app/services/game.service';
import { SocketService } from 'src/app/services/request/socket.service';

@Component({
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyPage implements OnInit, OnDestroy {

  all?: Subscription;
  player?: Subscription;

  constructor(public game: GameService, private snackBar: MatSnackBar) { }

  get SocketKey() {
    return SocketKey;
  }

  ngOnInit(): void {
    this.all = this.game.all.subscribe(this.handleEvent.bind(this));
    this.player = this.game.player.subscribe(this.handleEvent.bind(this));
  }

  ngOnDestroy(): void {
    this.all?.unsubscribe();
    this.player?.unsubscribe();
  }

  handleEvent(event: any) {
    console.log(event);
    switch(event.action) {
      case 'error':
        this.error(event.args.message);
        break;
      case 'deck_selected':
        this.message(`Deck ${event.args.deckHash} selected.`);
        break;
    }
  }

  message(text: string) {
    this.snackBar.open(text, undefined, { duration: 3000 });
  }

  error(text: string) {
    this.snackBar.open(text, undefined, { duration: 3000, panelClass: 'error-message' });
  }
}
