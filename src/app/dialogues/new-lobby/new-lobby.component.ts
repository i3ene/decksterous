import { Component } from '@angular/core';

@Component({
  templateUrl: './new-lobby.component.html',
  styleUrls: ['./new-lobby.component.scss']
})
export class NewLobbyDialogue {

  name: string = "";

  constructor() { }

  isValid(): boolean {
    if(!this.name) return false;
    return true;
  }
}
