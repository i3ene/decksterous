import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  passwordVisibilityToggle(element: any) {
    element.type == 'text'
      ? (element.type = 'password')
      : (element.type = 'text');
  }

  getVisibilityIcon(element: any) {
    return element.type == 'text' ? 'visibility_off' : 'visibility';
  }
}
