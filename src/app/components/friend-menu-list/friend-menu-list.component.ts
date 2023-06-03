import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TokenService } from 'src/app/services/auth/token.service';
import { DataService } from 'src/app/services/data.service';
import { FriendListComponent } from '../friend-list/friend-list.component';

@Component({
  selector: 'app-friend-menu-list',
  templateUrl: './friend-menu-list.component.html',
  styleUrls: ['./friend-menu-list.component.scss']
})
export class FriendMenuListComponent implements OnInit {
  @ViewChild(FriendListComponent, { static: true }) friendList!: FriendListComponent;

  _userId: number = 0;
  @Input() set userId(value: number) {
    this._userId = value;
    this.loadFriends(value);
  }
  get userId() {
    return this._userId;
  }

  constructor(private data: DataService) {}

  ngOnInit(): void {
    if (this.userId == 0) this.loadSelf();
  }

  async loadSelf() {
    this.friendList.friends = (await this.data.self.friends).accepted ?? [];
    this.friendList.invites = (await this.data.self.friends).invites ?? [];
    this.friendList.requests = (await this.data.self.friends).requests ?? [];
  }

  async loadFriends(userId: number) {
    const friends = await this.data.getFriends(userId);
    this.friendList.friends = friends;
    this.friendList.invites = [];
    this.friendList.requests = [];
  }

}
