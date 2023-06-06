import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'src/app/config/config';
import { User } from 'src/app/models/data/user.model';
import { DataService } from 'src/app/services/data.service';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginForm {

  credentials: User = new User();

  constructor(private request: RequestService, private router: Router, private data: DataService) {}

  async login() {
    const response = await this.request.post("/auth/signin", this.credentials);
    localStorage[Config.AuthToken] = response;
    this.data.self.reset();
    this.router.navigate(["/navigation"]);
  }

}
