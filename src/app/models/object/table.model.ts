export interface IColumn {
  key: string;
  name: string;
  edit?: 'text' | 'number' | 'image' | 'select';
  select?: IColumnSelect;
}

export interface IColumnSelect {
  multiple: boolean;
  options: any[];
  displayKey?: string;
  valueKey?: string;
}
