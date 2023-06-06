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

export interface SettingIcons {
  /**
   * Value or Set of icons
   */
  icons?: string | string[];
} 

export type SettingAny = Setting<any>;

export type SettingCombined<T> = SettingMinMax<number> & SettingSelection<T>;

export type SettingOptions<T> = ((T extends never ? true : false) extends false ? (SettingCombined<T>) : (T extends (infer U)[] ? (SettingMinMax<never> | SettingSelection<T>) : (SettingMinMax<number> | SettingSelection<never>) | (SettingMinMax<never> | SettingSelection<T>))) & SettingIcons;


export class Setting<T> implements Setting<T> {
  constructor(value: T, options?: SettingOptions<T>) {
    this.value = value;
    this.options = options;
  }
}

/**
 * Examples:
 * ```ts
 * // @ts-ignore
 * Toggle = new Setting<boolean>(true, { icons: ['dark_mode', 'light_mode'] }),
 * // @ts-ignore
 * Checkbox = new Setting<boolean>(undefined, { multi: true, icons: ['check_box', 'check_box_outline_blank', 'indeterminate_check_box'] }),
 * // @ts-ignore
 * NumberSpinner = new Setting<number>(3),
 * // @ts-ignore
 * NumberSlider = new Setting<number>(5, { min: 3, max: 10, icons: ['brightness_1', 'brightness_2', 'brightness_3', 'brightness_4', 'brightness_5', 'brightness_6', 'brightness_7'] }),
 * // @ts-ignore
 * NumberRange = new Setting<number[]>([3,8], { min: 2, max: 20, multi: true }),
 * // @ts-ignore
 * TextField = new Setting<string>('test', { min: 4, max: 10, icons: ['lock_open', 'lock', 'enhanced_encryption'] }),
 * // @ts-ignore
 * SingleSelection = new Setting<string>('test1', { selection: ['test1', 'test2', 'test3', 'test4', 'test5'], icons: ['signal_wifi_0_bar', 'signal_wifi_1_bar', 'signal_wifi_2_bar', 'signal_wifi_3_bar', 'signal_wifi_4_bar'] }),
 * // @ts-ignore
 * MultiSelection = new Setting<string[]>(['test1','test2','test3'], { selection: ['test1', 'test2', 'test3', 'test4', 'test5'], multi: true, icons: ['exposure_neg_2', 'exposure_neg_1', 'exposure_zero', 'exposure_plus_1', 'exposure_plus_2', 'exposure'] }),
 * ```
 */
export enum Settings {
  // @ts-ignore
  Dark_Theme = new Setting<boolean>(true, { icons: ['dark_mode', 'light_mode'] }),
  // @ts-ignore
  Game_Volume = new Setting<number>(75, { max: 100, icons: ['volume_mute', 'volume_down', 'volume_up'] }),
}

export type SettingsProperty<T = typeof Settings> = {
  -readonly [K in keyof T]: Setting<any>['value'];
};

export type SettingsExisting = Omit<SettingsProperty, 'x'>;

export interface SettingsProperties extends SettingsExisting { }

export class SettingsProperties { }
