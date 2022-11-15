import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from '../../services/request/request.service';
import { User } from '../../models/data/user.model';
import { TokenService } from 'src/app/services/auth/token.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User = new User({ name: 'Loading...' });

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
