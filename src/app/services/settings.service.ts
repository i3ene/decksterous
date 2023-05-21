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
    return localStorage[prop] ?? setting.value;
  }

  set(target: any, prop: any, newValue: any, receiver: any) {
    if (!Object.keys(Settings).includes(prop)) return false;

    const setting = Settings[prop as any] as unknown as Setting<unknown>;
    if (typeof setting.value != typeof newValue) return false;

    if (setting.options) {
      if (setting.options.max) localStorage[prop] = Math.min(setting.options.max as any, newValue);
      if (setting.options.min) localStorage[prop] = Math.max(setting.options.min as any, newValue);
      if (setting.options.selection) {
        newValue = (newValue as any[]).filter(x => ((setting.options as any).selection as any[]).some(x));
        localStorage[prop] = setting.options.multi ? newValue : [newValue[0]];
      }
    }
    return true;
  }
}
