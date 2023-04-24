import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketKey } from 'src/app/models/object/service.model';
import { SocketConnection } from 'src/app/services/request/socket.connection';
import { SocketService } from 'src/app/services/request/socket.service';

@Component({
  selector: 'dev-socket',
  templateUrl: './socket.component.html',
  styleUrls: ['./socket.component.scss'],
})
export class DevSocketComponent {
  constructor(public socket: SocketService) { }

  get SocketKey() {
    return SocketKey;
  }
}
