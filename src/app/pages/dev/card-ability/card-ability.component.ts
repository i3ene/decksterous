import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ability } from 'src/app/models/data/card.model';
import { ColumnAction, IColumn, ITableActionEvent } from 'src/app/models/object/table.model';
import { RequestService } from 'src/app/services/request/request.service';
import { FormTableTemplate } from 'src/app/templates/form-table/form-table.component';

@Component({
  selector: 'dev-card-ability',
  templateUrl: './card-ability.component.html',
  styleUrls: ['./card-ability.component.scss']
})
export class DevCardAbilityComponent implements OnInit {

  @ViewChild('formTable') table!: FormTableTemplate;

  data!: Ability[];
  columns: IColumn[] = [
    { key: 'key', name: 'Key', type: 'text' },
    { key: 'name', name: 'Name', type: 'text' },
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
    this.loadCardAbilities();
  }

  async loadCardAbilities(): Promise<void> {
    const payload = await this.request.get("/ability/all");
    this.data = payload.map((x: any) => new Ability(x));
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
        if (!this.table._selected.key) return this.table.cancelSelect();
        const oldKey = this.table?._selectedClone?.key;
        var payload = this.table.saveSelect();
        var response = oldKey ? await this.request.put(`/ability/${oldKey}`, payload) : await this.request.post("/ability", payload);
        if (response) Object.assign(payload, response);
        break;
      case 'delete':
        var payload = event.row;
        await this.request.delete(`/ability/${payload.key}`);
        this.table.deleteSelect(payload);
        break;
    }
  }

}
