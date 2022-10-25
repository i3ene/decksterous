import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {

  credentials: User = new User();

  constructor(private request: RequestService, private router: Router) {}

  async register() {
    const response = await this.request.post("/auth/signup", this.credentials);
    this.router.navigate(["/auth"]);
  }

}
