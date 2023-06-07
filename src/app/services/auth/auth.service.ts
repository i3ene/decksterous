import { Injectable } from '@angular/core';
import { SocketConnection } from '../request/socket.connection';
import { ValidationType } from 'src/app/pages/auth/forms/email-form/email-form.component';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  validation = this.socket.fromEvent<{ token: string, mail: string, type: string }>('auth-validation');
  error = this.socket.fromEvent<string>('auth-error');

  constructor(public socket: SocketConnection) {
    this.error.subscribe(x => console.log(x));
  }

  /**
   * Request token from server
   * @param type What action should be linked to token (registration/password reset)
   */
  requestToken(type: ValidationType) {
    this.socket.emit('auth-token', type);
    return this.validation;
  }
}
