import { Component } from '@angular/core';
import { SocketConnection } from './services/request/socket.connection';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Decksterous';
  version = '0.0.1';

  constructor(private socket: SocketConnection) {
    this.socket.fromEvent<any>("joined").subscribe(message => { console.log(message) });
  }

}
