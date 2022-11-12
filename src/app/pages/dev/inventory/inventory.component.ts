import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Inventory } from 'src/app/models/data/inventory.model';
import { ColumnAction, IColumn, ITableActionEvent } from 'src/app/models/object/table.model';
import { RequestService } from 'src/app/services/request/request.service';
import { FormTableComponent } from 'src/app/templates/form-table/form-table.component';

@Component({
  selector: 'dev-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class DevInventoryComponent {
  @ViewChild('formTable') table!: FormTableComponent;
  @Output() selectedEvent: EventEmitter<any> = new EventEmitter<any>();

  data!: Inventory[];
  columns: IColumn[] = [
    { key: 'id', name: 'ID' },
    { key: 'userId', name: 'User ID', type: 'number' },
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
    const payload = await this.request.get("/inventory/all");
    this.data = payload.map((x: any) => new Inventory(x));
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
