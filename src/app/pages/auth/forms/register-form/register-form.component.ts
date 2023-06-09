import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICredentials, User } from 'src/app/models/data/user.model';
import { DataService } from 'src/app/services/data.service';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterForm {

  token?: string;
  credentials: ICredentials = { name: '', password: '' };

  constructor(private router: Router, private route: ActivatedRoute, private data: DataService) {
    this.route.queryParams.subscribe(params => this.token = params['token']);
  }

  async register() {
    if (!this.token) return;
    await this.data.register(this.token, this.credentials);
    this.router.navigate(["/auth"]);
  }

}
