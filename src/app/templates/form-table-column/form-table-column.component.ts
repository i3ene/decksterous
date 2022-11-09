import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IColumn } from 'src/app/models/object/table.model';

@Component({
  selector: 'app-form-table-column',
  templateUrl: './form-table-column.component.html',
  styleUrls: ['./form-table-column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormTableColumnComponent {

  @Input() isEditing: boolean = false;
  @Input() column!: IColumn;
  @Input() row!: any;

}
