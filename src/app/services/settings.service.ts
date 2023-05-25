import { Injectable } from '@angular/core';
import { Setting, Settings, SettingsProperties } from '../models/object/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService extends SettingsProperties {

  constructor() {
    super();
    return new Proxy(this, this as any);
  }

  get(target: any, prop: any) {
    if (!Object.keys(Settings).includes(prop)) return undefined;
    const setting = Settings[prop as any] as unknown as Setting<any>;
    return this.parse(localStorage[prop]) ?? setting.value;
  }

  set(target: any, prop: any, newValue: any, receiver: any) {
    if (!Object.keys(Settings).includes(prop)) return false;

    const setting = Settings[prop as any] as unknown as Setting<unknown>;
    if (
      (typeof setting.value != typeof newValue) ||
      (
        (Array.isArray(setting.value) && Array.isArray(newValue)) &&
        (setting.value.length && newValue.length) &&
        (typeof setting.value[0] != typeof newValue[0])
      )
    ) return false;
    if (setting.options) {
      if (setting.options.max) newValue = Math.min(setting.options.max as any, newValue);
      if (setting.options.min) newValue = Math.max(setting.options.min as any, newValue);
      if (setting.options.selection) {
        newValue = (newValue as any[]).filter(x => ((setting.options as any).selection as any[]).includes(x));
        newValue = setting.options.multi ? newValue : [newValue[0]];
      }
    }
    localStorage[prop] = JSON.stringify(newValue);
    return true;
  }

  parse(value: any) {
    if (value == undefined) return null;
    const res: any = JSON.parse(value, (k: any, v: any) => {
      if(!!k) return v;
      else return v ?? null;
    });
    return res;
  }
}
