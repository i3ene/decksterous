import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/data/user.model';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordForm {

  credentials: User = new User();

  constructor(private request: RequestService, private router: Router) {}

  async reset() {
    const response = await this.request.post("/auth/passwordreset", this.credentials);
    this.router.navigate(["/auth"]);
  }

}
