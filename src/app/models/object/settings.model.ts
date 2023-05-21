export interface Setting<T> {
  /**
   * Default value (and type specifier)
   */
  value: T;
  /**
   * Extended options for (range or selection) value
   */
  options?: SettingOptions<T>
}

export interface SettingMinMax<T> {
  max?: T;
  min?: T;
}

export interface SettingSelection<T, E = (T extends never ? true : false) extends false ? T : (T extends (infer U)[] ? U : T)> {
  /**
   * Available selection options
   */
  selection?: E[];
  /**
   * If selection allows multi value
   */
  multi?: boolean;
}

export type SettingCombined<T> = SettingMinMax<T> & SettingSelection<T>;

export type SettingOptions<T> = (T extends never ? true : false) extends false ? (SettingCombined<T>) : (T extends (infer U)[] ? (SettingMinMax<never> | SettingSelection<T>) : (SettingMinMax<T> | SettingSelection<never>) | (SettingMinMax<never> | SettingSelection<T>));


export class Setting<T> implements Setting<T> {
  constructor(value: T, options?: SettingOptions<T>) {
    this.value = value;
    this.options = options;
  }
}

export enum Settings {
  // @ts-ignore
  Test = new Setting<number>([1,2,3], { selection: [1, 2, 3, 4, 5], multi: true }),
  // @ts-ignore
  DarkTheme = new Setting<boolean>(true)
}

export type SettingsProperty<T = typeof Settings> = {
  -readonly [K in keyof T]: Setting<any>['value'];
};

export type SettingsExisting = Omit<SettingsProperty, 'x'>;

export interface SettingsProperties extends SettingsExisting { }

export class SettingsProperties { }