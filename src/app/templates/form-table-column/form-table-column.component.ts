import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { InputServiceEvent } from 'src/app/models/object/service.model';
import { IColumn, ITableActionEvent } from 'src/app/models/object/table.model';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-form-table-column',
  templateUrl: './form-table-column.component.html',
  styleUrls: ['./form-table-column.component.scss']
})
export class FormTableColumnComponent {

  @Input() selected: any;
  @Input() column!: IColumn;
  @Input() row!: any;

  @Output() actionEvent: EventEmitter<ITableActionEvent> = new EventEmitter<ITableActionEvent>();

  constructor(public dataService: DataService) {
    dataService.uploadEvent.subscribe((obj: InputServiceEvent) => {if (this.row == obj.source.row) this.row[obj.source.name] = obj.data});
  }

  numberInput(obj: any, event: any) {
    // TODO: Check
    console.log(event);
  }

  map(arr: any[], key?: string) {
    if (arr == undefined) return [];
    return arr.map(x => key ? x[key] : x);
  }

  combine(options: any[], value: any) {
    if (!Array.isArray(value)) return options;
    const arr = options.map(x => value.find(y => JSON.stringify(x) === JSON.stringify(y)) ?? x);
    return arr;
  }
}
