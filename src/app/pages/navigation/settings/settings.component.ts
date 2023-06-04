import { Component, OnInit } from '@angular/core';
import { Setting, Settings } from 'src/app/models/object/settings.model';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  get Settings() {
    return Settings;
  }

  get keys() {
    return Object.keys(Settings).filter(x => x != new Object().toString());
  }

  constructor(public settings: SettingsService) { }

  labelText(text: string) {
    let words = text.split('_');
    words = words.map(x => x.charAt(0).toUpperCase() + x.slice(1));
    return words.join(' ');
  }

  getType(setting: Setting<unknown>) {
    const value = setting.value;
    var type: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "range" | "slide" | "check" | "array" = typeof value;
    if (Array.isArray(value) || setting.options?.selection) {
      type = 'array';
      if (Array.isArray(value) && value[0] && typeof value[0] == 'number' && setting.options?.multi) {
        type = 'range';
      }
    } else if (type == 'number' && (setting.options?.min != undefined || setting.options?.max != undefined)) {
      type = 'slide';
    } else if ((type == 'boolean' || type == 'undefined') && setting.options?.multi) {
      type = 'check';
    }
    return type;
  }

  getIcon(key: any) {
    const setting = Settings[key] as unknown as Setting<unknown>;
    if (!setting.options || !setting.options.icons) return undefined;

    const value = (this.settings as any)[key];
    let index = typeof value == 'number' ? value : 0;
    switch(this.getType(setting)) {
      case "array":
        if (setting.options.multi) index = value.length;
        else index = setting.options.selection?.findIndex(x => x == value) ?? 0;
        break;
      case "boolean": case "check":
        index = value ? 0 : (value == false ? 1 : 2);
        break;
      case "string":
        index = value.length;
        break;
    }
    index = this.mapIcon(index, setting);
    return setting.options.icons[index];
  }

  mapIcon(value: number, setting: Setting<unknown>) {
    if (!setting.options || !setting.options.icons) return 0;
    let factor = value;
    if (setting.options.selection) {
      factor = setting.options.icons.length / setting.options.selection.length;
      factor = Math.floor(factor * value);
    } else if (setting.options.max) {
      let offset = setting.options.min ?? 0;
      factor = setting.options.icons.length / (setting.options.max - offset);
      value -= offset;
      factor = Math.floor(factor * value);
    }
    factor = Math.max(0, Math.min(factor, setting.options.icons.length - 1));
    return factor;
  }

  sliderLabel(value: number) {
    return `${value}`;
  }

}
