import { Component, Input, OnInit } from '@angular/core';
import { RequestService } from '../../services/request/request.service';
import { User } from '../../models/data/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() set friendId(value: number) {
    if (!value) return;
    this.loadFriends(value, false);
  }

  constructor(private request: RequestService) {}

  ngOnInit(): void {}

  friends: User[] = new Array(14).fill({ name: 'User', avatar: 'Avatar' });

  async loadFriends(id: number, user?: boolean) {
    //TODO URL for retrieving friends
    const payload = await this.request.get(`/inventory`);
    if (!payload || !payload.friends) this.friends = [];
    else this.friends = payload.friends.map((x: any) => new User(x));
  }
}
