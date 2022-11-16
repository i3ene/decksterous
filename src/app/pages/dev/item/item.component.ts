import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Item } from 'src/app/models/data/item.model';
import { ColumnAction, IColumn, ITableActionEvent } from 'src/app/models/object/table.model';
import { RequestService } from 'src/app/services/request/request.service';
import { FormTableComponent } from 'src/app/templates/form-table/form-table.component';

@Component({
  selector: 'dev-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class DevItemComponent implements OnInit {

  @ViewChild('formTable') table!: FormTableComponent;
  @Output() selectedEvent: EventEmitter<any> = new EventEmitter<any>();

  data!: Item[];
  columns: IColumn[] = [
    { key: 'id', name: 'ID' },
    { key: 'image', name: 'Image', type: 'image' },
    { key: 'name', name: 'Name', type: 'text' },
    { key: 'description', name: 'Description', type: 'text' },
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
    this.loadItems();
  }

  async loadItems(): Promise<void> {
    const payload = await this.request.get("/item/all");
    this.data = payload.map((x: any) => new Item(x));
  }

  actionEvent(event: ITableActionEvent): void {
    switch(event.action) {
      case 'edit':
        this.table.startSelect(event.row);
        break;
      case 'cancel':
        this.table.cancelSelect();
        break;
      case 'select':
        this.selectedEvent.emit(event.row);
    }
  }

}
