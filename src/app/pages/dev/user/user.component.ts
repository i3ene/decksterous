import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/data/user.model';
import { IColumn } from 'src/app/models/object/table.model';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'dev-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class DevUserComponent implements OnInit {

  data!: User[];
  columns: IColumn[] = [
    { key: 'id', name: 'ID', edit: 'number' },
    { key: 'name', name: 'Name', edit: 'text' },
    { key: 'mail', name: 'Mail', edit: 'text' },
    { key: 'xp', name: 'XP', edit: 'number' },
    { key: 'avatar', name: 'Avatar', edit: 'image' },
  ];

  constructor(private request: RequestService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    const payload = await this.request.get("/user/all");
    this.data = payload.map((x: any) => new User(x));
    console.log(this.data);
  }
}
