import { Component, Input, OnInit } from '@angular/core';
import { ValidationType } from '../email-form/email-form.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fallback-form',
  templateUrl: './fallback-form.component.html',
  styleUrls: ['./fallback-form.component.scss']
})
export class FallbackForm implements OnInit {

  emailAddress: string = "game@decksterous.digital";
  token: string = '';
  @Input() type: ValidationType = ValidationType.REGISTER;

  get text() {
    switch(this.type) {
      case ValidationType.REGISTER: return 'registration';
      case ValidationType.PASSWORD: return 'password reset';
      default: return 'next step';
    }
  }

  constructor(public socket: AuthService, public router: Router) { }

  ngOnInit(): void {
    // Retrieve token
    this.socket.requestToken(this.type).subscribe(x => {
      // Set token
      this.token = x.token
      // If mail is linked to validation, process to next step
      if(x.mail) {
        var route;
        switch(x.type as ValidationType) {
          case ValidationType.REGISTER:
            // Navigate to register page
            route = "/auth/registration";
            break;
          case ValidationType.PASSWORD:
            // Navigate to register page
            route = "/auth/password";
            break;
        }
        // If route is set, navigate to it
        if (route) this.router.navigate([route], { queryParams: { token: x.token } });
      }
    });
  }

}
