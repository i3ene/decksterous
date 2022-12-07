import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { SocketService } from 'src/app/services/request/socket.service';

@Component({
  selector: 'dev-game',
  templateUrl: './dev-game.component.html',
  styleUrls: ['./dev-game.component.scss']
})
export class DevGameComponent {


  constructor(public game: GameService) { }

}
