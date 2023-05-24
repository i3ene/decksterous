import { AfterViewInit, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

export enum EmailFormType {
  PASSWORD = 'password',
  REGISTER = 'register'
}


@Component({
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailForm implements AfterViewInit {

  type: EmailFormType = EmailFormType.REGISTER;
  emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  useFallback: boolean = false;

  get title() {
    switch(this.type) {
      case EmailFormType.REGISTER: return 'Signup';
      case EmailFormType.PASSWORD: return 'Reset Password';
      default: return 'Form';
    }
  }

  constructor(private route: ActivatedRoute) { }

  ngAfterViewInit(): void {
    this.type = this.route.snapshot.data['type'] as EmailFormType;
  }

  signup() {
    // TODO
  }

  reset() {
    // TODO
  }

  buttonClicked() {
    switch(this.type) {
      case EmailFormType.REGISTER: return this.signup();
      case EmailFormType.PASSWORD: return this.reset();
    }
  }

}
