import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
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

}
