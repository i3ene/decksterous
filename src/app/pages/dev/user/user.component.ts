import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { User } from 'src/app/models/data/user.model';
import { ColumnAction, IColumn, ITableActionEvent } from 'src/app/models/object/table.model';
import { RequestService } from 'src/app/services/request/request.service';
import { FormTableTemplate } from 'src/app/templates/form-table/form-table.component';

@Component({
  selector: 'dev-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class DevUserComponent implements OnInit {

  @ViewChild('formTable') table!: FormTableTemplate;
  @Output() selectedEvent: EventEmitter<any> = new EventEmitter<any>();

  data!: User[];
  columns: IColumn[] = [
    { key: 'id', name: 'ID' },
    { key: 'avatar', name: 'Avatar', type: 'image' },
    { key: 'name', name: 'Name', type: 'text' },
    { key: 'password', name: 'Password', type: 'text' },
    { key: 'mail', name: 'Mail', type: 'text' },
    { key: 'coins', name: 'Coins', type: 'number' },
    { key: 'xp', name: 'XP', type: 'number' },
    new ColumnAction("Action", [
      { name: 'edit', icon: 'edit' },
      { name: 'delete', icon: 'delete' },
      { name: 'select', icon: 'radio_button_unchecked' },
      { name: 'cancel', icon: 'close', onSelect: true },
      { name: 'save', icon: 'check', onSelect: true },
    ])
  ];

  constructor(private request: RequestService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    const payload = await this.request.get("/user/all");
    this.data = payload.map((x: any) => new User(x));
  }

  async actionEvent(event: ITableActionEvent): Promise<void> {
    switch(event.action) {
      case 'edit':
        this.table.startSelect(event.row);
        break;
      case 'cancel':
        this.table.cancelSelect();
        break;
      case 'save':
        var payload = this.table.saveSelect();
        if (!payload.password) delete payload.password;
        var response = payload.id ? await this.request.put(`/user/${payload.id}`, payload) : await this.request.post("/user", payload);
        delete response.password;
        if (response) Object.assign(payload, response);
        break;
      case 'delete':
        var payload = event.row;
        await this.request.delete(`/user/${payload.id}`);
        this.table.deleteSelect(payload);
        break;
      case 'select':
        this.selectedEvent.emit(event.row);
    }
  }
}
