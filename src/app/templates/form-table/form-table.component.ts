import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  get displayedColumns(): string[] {
    return this.columns.map(x => x.key);
  }

  dataSource!: MatTableDataSource<any>;
  _data!: any[];
  @Input() set data(value: any[]) {
    this.dataSource = new MatTableDataSource<any>(value);
    this._data = value;
  }
  get data(): any[] {
    return this._data;
  }
  selected: any;

}
