import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CardAbility } from 'src/app/models/data/card.model';
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

  data!: CardAbility[];
  columns: IColumn[] = [
    { key: 'id', name: 'ID' },
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
    const payload = await this.request.get("/item/card/ability/all");
    this.data = payload.map((x: any) => new CardAbility(x));
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
        var response = payload.id ? await this.request.put("/item/card/ability", payload) : await this.request.post("/item/card/ability", payload);
        if (response.payload) Object.assign(payload, response.payload);
        break;
      case 'delete':
        var payload = event.row;
        await this.request.delete("/item/card/ability", payload);
        this.table.deleteSelect(payload);
        break;
    }
  }

}
