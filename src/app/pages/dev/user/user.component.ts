import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { User } from 'src/app/models/data/user.model';
import { ColumnAction, IColumn, ITableActionEvent } from 'src/app/models/object/table.model';
import { RequestService } from 'src/app/services/request/request.service';
import { FormTableComponent } from 'src/app/templates/form-table/form-table.component';

@Component({
  selector: 'dev-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class DevUserComponent implements OnInit {

  @ViewChild('formTable') table!: FormTableComponent;
  @Output() selectedEvent: EventEmitter<any> = new EventEmitter<any>();

  data!: User[];
  columns: IColumn[] = [
    { key: 'id', name: 'ID' },
    { key: 'avatar', name: 'Avatar', type: 'image' },
    { key: 'name', name: 'Name', type: 'text' },
    { key: 'mail', name: 'Mail', type: 'text' },
    { key: 'xp', name: 'XP', type: 'number' },
    new ColumnAction("Action", [
      { name: 'edit', icon: 'edit' },
      { name: 'delete', icon: 'delete' },
      { name: 'select', icon: 'radio_button_unchecked' },
      { name: 'cancel', icon: 'close', onEdit: true },
      { name: 'save', icon: 'check', onEdit: true },
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

  actionEvent(event: ITableActionEvent): void {
    switch(event.action) {
      case 'edit':
        this.table.selected = event.row;
        break;
      case 'cancel':
        this.table.selected = undefined;
        break;
      case 'select':
        this.selectedEvent.emit(event.row);
    }
  }
}
