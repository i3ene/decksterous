import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { IColumn } from 'src/app/models/object/table.model';

@Component({
  selector: 'app-form-table-column',
  templateUrl: './form-table-column.component.html',
  styleUrls: ['./form-table-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormTableColumnComponent {

  @Input() editing: any;
  @Input() column!: IColumn;
  @Input() row!: any;

  @Output() actionEvent: EventEmitter<any> = new EventEmitter<any>();

}
