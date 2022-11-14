import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/data/user.model';
import { TokenService } from 'src/app/services/auth/token.service';
import { RequestService } from 'src/app/services/request/request.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-profile-menu-item',
  templateUrl: './profile-menu-item.component.html',
  styleUrls: ['./profile-menu-item.component.scss'],
})
export class ProfileMenuItemComponent implements OnInit {
  user: User = new User({ name: 'Name' });

  constructor(private token: TokenService, private request: RequestService, public stats: StatsService) {}

  ngOnInit(): void {
    const data = this.token.getTokenData();
    if (data.id) this.loadUser(data.id);
  }

  async loadUser(id: number) {
    const payload = await this.request.get(`/user?id=${id}`);
    this.user = new User(payload);
  }

}
