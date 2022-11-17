import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/auth/token.service';

@Component({
  selector: 'app-friend-menu-list',
  templateUrl: './friend-menu-list.component.html',
  styleUrls: ['./friend-menu-list.component.scss']
})
export class FriendMenuListComponent implements OnInit {
  id!: number;

  constructor(private token: TokenService) {}

  ngOnInit(): void {
    const data = this.token.getTokenData();
    if (data.id) this.id = data.id;
  }


}
