import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketConnection } from 'src/app/services/request/socket.connection';
import { SocketService } from 'src/app/services/request/socket.service';

@Component({
  selector: 'app-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.scss'],
})
export class SocketComponent {
  constructor(public socket: SocketService) { }
}
