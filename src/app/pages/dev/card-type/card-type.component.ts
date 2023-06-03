import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Type } from 'src/app/models/data/card.model';
import { ColumnAction, IColumn, ITableActionEvent } from 'src/app/models/object/table.model';
import { RequestService } from 'src/app/services/request/request.service';
import { FormTableTemplate } from 'src/app/templates/form-table/form-table.component';

@Component({
  selector: 'dev-card-type',
  templateUrl: './card-type.component.html',
  styleUrls: ['./card-type.component.scss']
})
export class DevCardTypeComponent implements OnInit {

  @ViewChild('formTable') table!: FormTableTemplate;

  data!: Type[];
  columns: IColumn[] = [
    { key: 'id', name: 'ID' },
    { key: 'type', name: 'Type', type: 'text' },
    { key: 'description', name: 'Description', type: 'text' },
    new ColumnAction("Action", [
      { name: 'edit', icon: 'edit' },
      { name: 'delete', icon: 'delete' },
      { name: 'cancel', icon: 'close', onSelect: true },
      { name: 'save', icon: 'check', onSelect: true },
    ])
  ];

  constructor(private request: RequestService) {}

  ngOnInit(): void {
    this.loadCardTypes();
  }

  async loadCardTypes(): Promise<void> {
    const payload = await this.request.get("/type/all");
    this.data = payload.map((x: any) => new Type(x));
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
        var response = payload.id ? await this.request.put(`/type/${payload.id}`, payload) : await this.request.post("/type", payload);
        if (response) Object.assign(payload, response);
        break;
      case 'delete':
        var payload = event.row;
        await this.request.delete(`/type/${payload.id}`);
        this.table.deleteSelect(payload);
        break;
    }
  }

}
