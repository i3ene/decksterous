import { Component, OnInit } from '@angular/core';
import { Settings, SettingsProperty } from 'src/app/models/object/settings.model';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(public settings: SettingsService) { }

  ngOnInit(): void {
    console.log(this.settings.Test);
    this.settings.DarkTheme = false;
  }

}
