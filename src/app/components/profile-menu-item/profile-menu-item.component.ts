import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/data/user.model';
import { TokenService } from 'src/app/services/auth/token.service';

@Component({
  selector: 'app-profile-menu-item',
  templateUrl: './profile-menu-item.component.html',
  styleUrls: ['./profile-menu-item.component.scss'],
})
export class ProfileMenuItemComponent implements OnInit {
  user: User = new User({ name: 'Name' });

  id!: number;

  constructor(private token: TokenService) {}

  ngOnInit(): void {
    const data = this.token.getTokenData();
    if (data.id) this.id = data.id;
  }

}
