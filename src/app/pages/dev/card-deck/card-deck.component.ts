import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Deck, Item } from 'src/app/models/data/item.model';
import { ColumnAction, IColumn, ITableActionEvent } from 'src/app/models/object/table.model';
import { RequestService } from 'src/app/services/request/request.service';
import { FormTableTemplate } from 'src/app/templates/form-table/form-table.component';

@Component({
  selector: 'dev-card-deck',
  templateUrl: './card-deck.component.html',
  styleUrls: ['./card-deck.component.scss']
})
export class DevCardDeckComponent implements OnInit {

  @ViewChild('formTable') table!: FormTableTemplate;
  @Output() selectedEvent: EventEmitter<any> = new EventEmitter<any>();

  data!: Deck[];
  items: Item[] = [new Item({name: '- None -'})];
  columns: IColumn[] = [
    { key: 'id', name: 'ID' },
    { key: 'maxCards', name: 'Card Limit', type: 'number' },
    { key: 'itemId', name: 'Item ID', type: 'select', select: {
      multiple: false,
      options: this.items,
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
    this.loadCardDecks();
    this.loadItems();
  }

  async loadCardDecks(): Promise<void> {
    const payload = await this.request.get("/deck/all");
    this.data = payload.map((x: any) => new Deck(x));
  }

  async loadItems(): Promise<void> {
    const payload = await this.request.get("/item/all");
    this.items.push(...payload.map((x: any) => new Item(x)));
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
        var response = payload.id ? await this.request.put(`/deck/${payload.id}`, payload) : await this.request.post("/deck", payload);
        if (response) Object.assign(payload, response);
        break;
      case 'delete':
        var payload = event.row;
        await this.request.delete(`/deck/${payload.id}`);
        this.table.deleteSelect(payload);
        break;
      case 'select':
        this.selectedEvent.emit(event.row);
    }
  }

}
