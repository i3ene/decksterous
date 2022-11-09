import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { IColumn } from 'src/app/models/object/table.model';

@Component({
  selector: 'app-form-table',
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.scss']
})
export class FormTableComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('table') table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() columns!: IColumn[];
  @Input() set data(value: any[]) {
    this.dataSource = new MatTableDataSource<any>(value);
    this._data = value;
  }

  @Input() showPaginator: boolean = true;
  @Input() paginatorSize: number = 10;
  @Input() paginatorSizeOptions: number[] = [5,10,25,50];
  @Output() paginatorChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  dataSource!: MatTableDataSource<any>;
  selected: any;
  _data!: any[];

  get displayedColumns(): string[] {
    return this.columns.map(x => x.key);
  }

  get data(): any[] {
    return this._data;
  }

}
