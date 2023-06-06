import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/data/user.model';
import { DataService } from 'src/app/services/data.service';
import { RequestService } from 'src/app/services/request/request.service';
import { StatsService } from 'src/app/services/stats.service';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: ['./profile-item.component.scss']
})
export class ProfileItemComponent {

  @Input() set id(value: number | undefined) {
    if (!value) return;
    this.loadUser(value);
  }

  user: User = new User({ name: 'Name' });

  constructor(private request: RequestService, public stats: StatsService, private data: DataService) {}

  async loadUser(id: number) {
    const payload = await this.data.getUser(id);
    this.user = new User(payload);
  }

}
