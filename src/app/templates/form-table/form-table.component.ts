import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatLegacyPaginator as MatPaginator, LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTable as MatTable, MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { IColumn, ITableActionEvent } from 'src/app/models/object/table.model';

@Component({
  selector: 'template-form-table',
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.scss'],
})
export class FormTableTemplate {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('table') table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;

  @Input() title!: string;

  @Input() columns!: IColumn[];
  @Input() set data(value: any[]) {
    this.dataSource = new MatTableDataSource<any>(value);
    if (this.paginator) this.dataSource.paginator = this.paginator;
    if (this.sort) this.dataSource.sort = this.sort;
    this._data = value;
  }

  @Input() showPaginator: boolean = true;
  @Input() paginatorSize: number = 10;
  @Input() paginatorSizeOptions: number[] = [5, 10, 25, 50];
  @Output() paginatorChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();

  @Output() actionEvent: EventEmitter<ITableActionEvent> = new EventEmitter<ITableActionEvent>();

  dataSource!: MatTableDataSource<any>;
  _selected: any;
  _selectedClone: any;
  _data!: any[];
  _placeholder: any = {};

  get selected(): any {
    return this._selected;
  }

  get displayedColumns(): string[] {
    return this.columns.map((x) => x.key);
  }

  get data(): any[] {
    return this._data;
  }

  startSelect(row: any): void {
    let index = this.dataSource.data.indexOf(row);
    if (index != -1) {
      this._selectedClone = Object.assign({}, row);
    } else {
      this.dataSource.data.push(row);
      this.dataSource._updateChangeSubscription();
      this.paginator.lastPage();
    }
    this._selected = row;
  }

  cancelSelect(): void {
    if (!this._selected) return;
    if (!this._selectedClone) return this.deleteSelect(this._selected);
    for (let [index, item] of this.dataSource.data.entries()) {
      if (item == this._selected) {
        this.dataSource.data[index] = this._selectedClone;
        this.dataSource.data = this.dataSource.data;
      }
    }
    this._selected = undefined;
    this._selectedClone = undefined;
  }

  saveSelect(): any {
    const row = this._selected;
    this._selected = undefined;
    this._selectedClone = undefined;
    return row;
  }

  deleteSelect(row: any): void {
    const index = this.dataSource.data.indexOf(row);
    if (index != -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }
    this._selected = undefined;
    this._selectedClone = undefined;
  }

  addEntry(): void {
    this.startSelect({});
  }
}
