import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SubInventory } from 'src/app/models/data/object.model';
import { ColumnAction, IColumn, ITableActionEvent } from 'src/app/models/object/table.model';
import { RequestService } from 'src/app/services/request/request.service';
import { FormTableTemplate } from 'src/app/templates/form-table/form-table.component';

@Component({
  selector: 'app-sub-inventory',
  templateUrl: './sub-inventory.component.html',
  styleUrls: ['./sub-inventory.component.scss']
})
export class DevSubInventoryComponent implements OnInit {

  @ViewChild('formTable') table!: FormTableTemplate;
  @Output() selectedEvent: EventEmitter<any> = new EventEmitter<any>();

  data!: SubInventory[];
  columns: IColumn[] = [
    { key: 'id', name: 'ID' },
    { key: 'objectHash', name: 'ObjectHash', type: 'text' },
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
    this.loadSubInventories();
  }

  async loadSubInventories(): Promise<void> {
    const payload = await this.request.get("/subinventory/all");
    this.data = payload.map((x: any) => new SubInventory(x));
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
        var response = payload.id ? await this.request.put(`/subinventory/${payload.id}`, payload) : await this.request.post("/subinventory", payload);
        if (response) Object.assign(payload, response);
        break;
      case 'delete':
        var payload = event.row;
        await this.request.delete(`/subinventory/${payload.id}`);
        this.table.deleteSelect(payload);
        break;
      case 'select':
        this.selectedEvent.emit(event.row);
    }
  }

}
