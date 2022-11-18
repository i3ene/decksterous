import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-friend-list-search',
  templateUrl: './friend-list-search.component.html',
  styleUrls: ['./friend-list-search.component.scss']
})
export class FriendListSearchComponent {

  searchField: boolean = false;
  @Output() toggleEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() findEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.toggleEvent.subscribe(x => this.searchField = x);
  }

}
