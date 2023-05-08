import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from '../../services/request/request.service';
import { User } from '../../models/data/user.model';
import { TokenService } from 'src/app/services/auth/token.service';
import { StatsService } from 'src/app/services/stats.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User = new User({ name: 'Loading...' });
  id?: number;

  constructor(private route: ActivatedRoute, private token: TokenService, private request: RequestService, public stats: StatsService) {
    this.route.queryParams.subscribe(params => this.idChange(params['id']));
  }

  idChange(id?: number) {
    this.id = id;
    if (id) this.loadUser(id);
    else this.loadToken();
  }

  ngOnInit(): void {
    if (!this.id) this.loadToken();
  }

  loadToken(): void {
    const data = this.token.getTokenData();
    if (data && data.id != undefined) this.loadUser(data.id);
  }

  async loadUser(id: number) {
    const payload = await this.request.get(`/user?id=${id}`);
    this.user = new User(payload);
  }
}
