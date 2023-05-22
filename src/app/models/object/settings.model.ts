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

export type SettingCombined<T> = SettingMinMax<number> & SettingSelection<T>;

export type SettingOptions<T> = (T extends never ? true : false) extends false ? (SettingCombined<T>) : (T extends (infer U)[] ? (SettingMinMax<never> | SettingSelection<T>) : (SettingMinMax<number> | SettingSelection<never>) | (SettingMinMax<never> | SettingSelection<T>));


export class Setting<T> implements Setting<T> {
  constructor(value: T, options?: SettingOptions<T>) {
    this.value = value;
    this.options = options;
  }
}

export enum Settings {
  // @ts-ignore
  Test_1 = new Setting<number>(5, { min: 3, max: 10 }),
  // @ts-ignore
  Test_2 = new Setting<string>('test', { min: 4, max: 10 }),
  // @ts-ignore
  Test_3 = new Setting<string>(['test1','test2','test3'], { selection: ['test1', 'test2', 'test3', 'test4', 'test5'], multi: true }),
  // @ts-ignore
  Dark_Theme = new Setting<boolean>(true)
}

export type SettingsProperty<T = typeof Settings> = {
  -readonly [K in keyof T]: Setting<any>['value'];
};

export type SettingsExisting = Omit<SettingsProperty, 'x'>;

export interface SettingsProperties extends SettingsExisting { }

export class SettingsProperties { }
