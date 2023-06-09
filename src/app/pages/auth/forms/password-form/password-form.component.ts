import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/data/user.model';
import { DataService } from 'src/app/services/data.service';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PasswordForm {

  token?: string;
  password: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private data: DataService) {
    this.route.queryParams.subscribe(params => this.token = params['token']);
  }

  async send() {
    if (!this.token) return;
    await this.data.password(this.token, this.password);
    this.router.navigate(["/auth/login"]);
  }

}
