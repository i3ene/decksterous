export interface IColumn {
  key: string;
  name: string;
  edit?: 'text' | 'number' | IColumnSelect;
}

export interface IColumnSelect {
  multiple: boolean;
  options: any[];
}