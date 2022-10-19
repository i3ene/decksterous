import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
