import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/data/user.model';
import { RequestService } from 'src/app/services/request/request.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent {

  @Input() set userId(value: number | undefined) {
    if (!value) return;
    //this.loadFriends(value);
  }
  @Input() onlyFriends: boolean = true;
  @Input() search: boolean = false;
  searchField: boolean = false;

  requests: User[] = new Array(2).fill({ name: 'Loading...' });
  friends: User[] = new Array(14).fill({ name: 'Loading...' });
  invites: User[] = new Array(2).fill({ name: 'Loading...' });

  constructor(private request: RequestService, public stats: StatsService) { }

  async loadFriends(id: number) {
    const payload = await this.request.get(`/user/friend?id=${id}`);
    if (!payload) this.friends = [];
    else this.friends = payload.map((x: any) => new User(x));
  }

}
