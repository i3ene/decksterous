import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Config } from 'src/app/config/config';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {

  credentials: { name: string, password: string } = { name: "", password: "" };

  constructor(private request: RequestService, private router: Router) {}

  async login() {
    const response = await this.request.post("/auth/signin", this.credentials);
    localStorage[Config.AuthToken] = response;
    this.router.navigate(["/navigation"]);
  }

}
