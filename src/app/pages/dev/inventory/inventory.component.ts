import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Inventory } from 'src/app/models/data/inventory.model';
import { User } from 'src/app/models/data/user.model';
import { ColumnAction, IColumn, ITableActionEvent } from 'src/app/models/object/table.model';
import { RequestService } from 'src/app/services/request/request.service';
import { FormTableTemplate } from 'src/app/templates/form-table/form-table.component';

@Component({
  selector: 'dev-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class DevInventoryComponent {
  @ViewChild('formTable') table!: FormTableTemplate;
  @Output() selectedEvent: EventEmitter<any> = new EventEmitter<any>();

  data!: Inventory[];
  users: User[] = [new User({name: '- None -'})];
  columns: IColumn[] = [
    { key: 'id', name: 'ID' },
    { key: 'userId', name: 'User ID', type: 'select', select: {
      multiple: false,
      options: this.users,
      displayKey: 'name',
      valueKey: 'id'
    }},
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
    this.loadInventories();
    this.loadUsers();
  }

  async loadUsers(): Promise<void> {
    const payload = await this.request.get("/user/all");
    this.users.push(...payload.map((x: any) => new User(x)));
  }

  async loadInventories(): Promise<void> {
    const payload = await this.request.get("/inventory/all");
    this.data = payload.map((x: any) => new Inventory(x));
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
        var response = payload.id ? await this.request.put("/inventory", payload) : await this.request.post("/inventory", payload);
        if (response.payload) Object.assign(payload, response.payload);
        break;
      case 'delete':
        var payload = event.row;
        await this.request.delete("/inventory", payload);
        this.table.deleteSelect(payload);
        break;
      case 'select':
        this.selectedEvent.emit(event.row);
    }
  }
}
