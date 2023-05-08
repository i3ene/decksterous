import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/auth/token.service';

@Component({
  selector: 'app-profile-menu-item',
  templateUrl: './profile-menu-item.component.html',
  styleUrls: ['./profile-menu-item.component.scss'],
})
export class ProfileMenuItemComponent implements OnInit {
  id!: number;

  constructor(private token: TokenService) {}

  ngOnInit(): void {
    const data = this.token.getTokenData();
    if (data && data.id != undefined) this.id = data.id;
  }

}
