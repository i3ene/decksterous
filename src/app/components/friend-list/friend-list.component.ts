import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/data/user.model';
import { RequestService } from 'src/app/services/request/request.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent {
  @Input() set userId(value: number | undefined) {
    if (!value) return;
    //this.loadFriends(value);
  }
  @Input() onlyFriends: boolean = true;
  @Input() search: boolean = false;
  searching: boolean = false;
  searches: User[];
  filter?: string;

  _requests!: User[];
  set requests(value: User[]) {
    this._requests = value;
  }
  get requests(): User[] {
    if (!this.filter) return this._requests;
    else return this._requests.filter(x => x.name.toLowerCase().includes(this.filter!.toLowerCase()));
  }

  _friends!: User[];
  set friends(value: User[]) {
    this._friends = value;
  }
  get friends(): User[] {
    if (!this.filter) return this._friends;
    else return this._friends.filter(x => x.name.toLowerCase().includes(this.filter!.toLowerCase()));
  }

  _invites!: User[];
  set invites(value: User[]) {
    this._invites = value;
  }
  get invites(): User[] {
    if (!this.filter) return this._invites;
    else return this._invites.filter(x => x.name.toLowerCase().includes(this.filter!.toLowerCase()));
  }

  constructor(private request: RequestService, public stats: StatsService) {
    this.requests = new Array(2).fill({ name: 'Loading...' });
    this.friends = new Array(14).fill({ name: 'Loading...' });
    this.invites = new Array(2).fill({ name: 'Loading...' });
    this.searches = new Array(2).fill({ name: 'Loading...' });
  }

  async loadFriends(id: number) {
    const payload = await this.request.get(`/user/friend?id=${id}`);
    if (!payload) this.friends = [];
    else this.friends = payload.map((x: any) => new User(x));
  }

  async loadUsers(name: string) {
    const payload = await this.request.get(`/user/all?name=${name}`);
    if (!payload) this.searches = [];
    else this.searches = payload.map((x: any) => new User(x));
  }

  setSearch(value: boolean) {
    if (!value) this.filter = undefined;
    this.searching = false;
    this.searches = [];
  }

  searchUsers(value: string) {
    console.log(value);
    this.filter = value;
  }

  findUsers(value: string) {
    this.searching = true;
    this.loadUsers(value);
  }
}
