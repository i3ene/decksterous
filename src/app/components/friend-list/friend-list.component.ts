import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/data/user.model';
import { DataService } from 'src/app/services/data.service';
import { RequestService } from 'src/app/services/request/request.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss'],
})
export class FriendListComponent {
  @Input() search: boolean = false;
  searching: boolean = false;
  searches: User[] = [];
  filter?: string;

  get onlyFriends(): boolean {
    return !(this._requests?.length || this._invites?.length);
  }

  _requests: User[] = [];
  set requests(value: User[]) {
    this._requests = value;
  }
  get requests(): User[] {
    if (!this.filter) return this._requests;
    else return this._requests.filter(x => x.name.toLowerCase().includes(this.filter!.toLowerCase()));
  }

  _friends: User[] = [];
  set friends(value: User[]) {
    this._friends = value;
  }
  get friends(): User[] {
    if (!this.filter) return this._friends;
    else return this._friends.filter(x => x.name.toLowerCase().includes(this.filter!.toLowerCase()));
  }

  _invites: User[] = [];
  set invites(value: User[]) {
    this._invites = value;
  }
  get invites(): User[] {
    if (!this.filter) return this._invites;
    else return this._invites.filter(x => x.name.toLowerCase().includes(this.filter!.toLowerCase()));
  }

  constructor(private request: RequestService, public stats: StatsService, private data: DataService) { }

  async loadUsers(name: string) {
    const payload = await this.data.self.searchFriends(name);
    if (!payload) this.searches = [];
    else this.searches = payload.map((x: any) => new User(x));
    this.filterList();
  }

  filterList() {
    const filter = ([] as any[]).concat(this._friends.map(x => x.id)).concat(this._invites.map(x => x.id)).concat(this._requests.map(x => x.id));
    this.searches = this.searches.filter(x => !filter.includes(x.id));
  }

  setSearch(value: boolean) {
    if (!value) this.filter = undefined;
    this.searching = false;
    this.searches = [];
  }

  searchFriends(value: string) {
    this.filter = value;
  }

  searchUsers(value: string) {
    this.searching = true;
    this.loadUsers(value);
  }

  async inviteUser(id: number) {
    const invite = this.searches.find(x => x.id == id);
    if (invite) this._invites.push(invite);
    this.filterList();
    await this.data.self.addFriend(id);
  }

  async acceptFriend(id: number) {
    const index = this._requests.findIndex(x => x.id == id);
    if (index < 0) return;
    const request = this._requests.splice(index, 1)[0];
    if (request) this._friends.push(request);
    await this.data.self.addFriend(id);
  }

  async declineFriend(id: number) {
    const index = this._requests.findIndex(x => x.id == id);
    if (index < 0) return;
    this._requests.splice(index, 1)[0];
    this.data.self.removeFriend(id);
  }
}
