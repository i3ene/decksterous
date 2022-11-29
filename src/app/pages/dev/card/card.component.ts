import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Card, CardAbility, CardType } from 'src/app/models/data/card.model';
import { Item } from 'src/app/models/data/item.model';
import { ColumnAction, IColumn, ITableActionEvent } from 'src/app/models/object/table.model';
import { RequestService } from 'src/app/services/request/request.service';
import { FormTableTemplate } from 'src/app/templates/form-table/form-table.component';

@Component({
  selector: 'dev-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class DevCardComponent implements OnInit {
  @ViewChild('formTable') table!: FormTableTemplate;
  @Output() selectedEvent: EventEmitter<any> = new EventEmitter<any>();

  data!: Card[];
  items: Item[] = [new Item({name: '- None -'})];
  types: CardType[] = [new CardType({type: '- None -'})];
  abilities: CardAbility[] = [];
  columns: IColumn[] = [
    { key: 'id', name: 'ID' },
    { key: 'health', name: 'Health', type: 'number' },
    { key: 'damage', name: 'Damage', type: 'number' },
    { key: 'cost', name: 'Cost', type: 'number' },
    { key: 'itemId', name: 'Item ID', type: 'select', select: {
      multiple: false,
      options: this.items,
      displayKey: 'name',
      valueKey: 'id'
    }},
    { key: 'typeId', name: 'Type ID', type: 'select', select: {
      multiple: false,
      options: this.types,
      displayKey: 'type',
      valueKey: 'id'
    }},
    { key: 'abilities', name: 'Abilities', type: 'select', select: {
      multiple: true,
      options: this.abilities,
      displayKey: 'name'
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
    this.loadCards();
    this.loadItems();
    this.loadCardTypes();
    this.loadCardAbilities();
  }

  async loadCardAbilities(): Promise<void> {
    const payload = await this.request.get("/item/card/ability/all");
    this.abilities.push(...payload.map((x: any) => new CardAbility(x)));
  }

  async loadCardTypes(): Promise<void> {
    const payload = await this.request.get("/item/card/type/all");
    this.types.push(...payload.map((x: any) => new CardType(x)));
  }

  async loadItems(): Promise<void> {
    const payload = await this.request.get("/item/all");
    this.items.push(...payload.map((x: any) => new Item(x)));
  }

  async loadCards(): Promise<void> {
    const payload = await this.request.get("/item/card/all");
    this.data = payload.map((x: any) => new Card(x));
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
        var response = payload.id ? await this.request.put("/item/card", payload) : await this.request.post("/item/card", payload);
        if (response.payload) Object.assign(payload, response.payload);
        break;
      case 'delete':
        var payload = event.row;
        await this.request.delete("/item/card", payload);
        this.table.deleteSelect(payload);
        break;
      case 'select':
        this.selectedEvent.emit(event.row);
    }
  }

}
