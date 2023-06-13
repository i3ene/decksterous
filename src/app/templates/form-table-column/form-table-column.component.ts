import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MatLegacySelect as MatSelect } from '@angular/material/legacy-select';
import { InputServiceEvent } from 'src/app/models/object/service.model';
import { IColumn, ITableActionEvent } from 'src/app/models/object/table.model';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'template-form-table-column',
  templateUrl: './form-table-column.component.html',
  styleUrls: ['./form-table-column.component.scss']
})
export class FormTableColumnTemplate {

  @Input() selected: any;
  @Input() column!: IColumn;
  @Input() row!: any;

  @Output() actionEvent: EventEmitter<ITableActionEvent> = new EventEmitter<ITableActionEvent>();

  constructor(public imageService: ImageService) {
    imageService.uploadEvent.subscribe((obj: InputServiceEvent) => {if (this.row == obj.source.row) this.row[obj.source.name] = obj.data});
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
