import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/request/socket.service';

@Component({
  selector: 'app-lobby-list',
  templateUrl: './lobby-list.component.html',
  styleUrls: ['./lobby-list.component.scss']
})
export class LobbyListComponent implements OnInit {

  constructor(public socket: SocketService) { }

  ngOnInit(): void {
  }

}
