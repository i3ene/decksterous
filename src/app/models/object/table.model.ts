export interface IColumn {
  key: string;
  name: string;
  type?: 'text' | 'number' | 'image' | 'select' | 'action';
  select?: IColumnSelect;
  actions?: IColumnAction[];
  getActions?(onEdit?: boolean): IColumnAction[];
}

export interface IColumnSelect {
  multiple: boolean;
  options: any[];
  displayKey?: string;
  valueKey?: string;
}

export interface IColumnAction {
  name: string;
  icon: string;
  onSelect?: boolean;
}

export class ColumnAction implements IColumn {
  key: string;
  name: string;
  type: any;
  actions?: IColumnAction[];

  constructor(name: string, actions?: IColumnAction[]) {
    this.name = name;
    this.key = '_action';
    this.type = 'action';
    if (actions) this.actions = actions;
  }

  getActions(onSelect?: boolean): IColumnAction[] {
    if (!this.actions) return [];
    return this.actions.filter((x) => !!x.onSelect == !!onSelect);
  }
}

export interface ITableActionEvent {
  action: string;
  row: any;
}
