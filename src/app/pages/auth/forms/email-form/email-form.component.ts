import { AfterViewInit, Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

export enum ValidationType {
  PASSWORD = 'password',
  REGISTER = 'registration'
}


@Component({
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.scss']
})
export class EmailForm implements AfterViewInit {

  type: ValidationType = ValidationType.REGISTER;
  emailFormControl: FormControl = new FormControl('', [Validators.required, Validators.email]);
  process: 'mail' | 'fallback' | 'validation' = 'mail';

  get title() {
    switch(this.type) {
      case ValidationType.REGISTER: return 'Signup';
      case ValidationType.PASSWORD: return 'Reset Password';
      default: return 'Form';
    }
  }

  constructor(private route: ActivatedRoute, private data: DataService, private router: Router) { }

  ngAfterViewInit(): void {
    this.type = this.route.snapshot.data['type'] as ValidationType;
  }

  signup() {
    this.data.signup(this.emailFormControl.value);
    this.router.navigate(["/auth/login"]);
  }

  reset() {
    this.data.reset(this.emailFormControl.value);
    this.router.navigate(["/auth/login"]);
  }

  sendClicked() {
    console.log(this.type);
    switch(this.type) {
      case ValidationType.REGISTER: return this.signup();
      case ValidationType.PASSWORD: return this.reset();
    }
  }

}
