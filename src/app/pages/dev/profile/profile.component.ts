import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dev-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class DevProfileComponent {

  @Input() id!: number;

}
