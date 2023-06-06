import { Component, Input, ViewChild } from '@angular/core';
import { RequestService } from '../../services/request/request.service';
import { User } from '../../models/data/user.model';
import { TokenService } from 'src/app/services/auth/token.service';
import { StatsService } from 'src/app/services/stats.service';
import { ActivatedRoute } from '@angular/router';
import { FriendListComponent } from '../friend-list/friend-list.component';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  @ViewChild(FriendListComponent) friendList!: FriendListComponent;

  _userId: number = 0;
  @Input() set userId(value: number) {
    if (value == 0) {
      this.loadSelf();
    } else {
      this._userId = value;
      this.loadUser(value);
    }
  }
  get userId() {
    return this._userId;
  }

  user: User = new User({ name: 'Loading...' });

  constructor(private route: ActivatedRoute, private token: TokenService, private request: RequestService, public stats: StatsService, private data: DataService) {
    this.route.queryParams.subscribe(params => this.userId = params['id'] ?? 0);
  }

  async loadSelf() {
    this.user = await this.data.self.user;
  }

  async loadUser(id: number) {
    this.user = await this.data.getUser(id);
  }
}
