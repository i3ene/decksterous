import { Component, OnInit } from '@angular/core';
import { Settings } from 'src/app/models/object/settings.model';
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

  getType(value: any) {
    if (Array.isArray(value)) return "array";
    return typeof value;
  }

  test(value: any) {
    console.log(value);
  }

}
