import { Component, Input, OnInit } from '@angular/core';
import { EmailFormType } from '../email-form/email-form.component';

@Component({
  selector: 'app-fallback-form',
  templateUrl: './fallback-form.component.html',
  styleUrls: ['./fallback-form.component.scss']
})
export class FallbackForm implements OnInit {

  emailAddress: string = "game@decksterous.digital";
  token: string = "67lyw53qsqnqg9nl";
  @Input() type: EmailFormType = EmailFormType.REGISTER;

  get text() {
    switch(this.type) {
      case EmailFormType.REGISTER: return 'registration';
      case EmailFormType.PASSWORD: return 'password reset';
      default: return 'next step';
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
