import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'src/app/config/config';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage[Config.AuthToken];

    const clone = request.clone({
      headers: request.headers.set(Config.AuthHeader, token ? token : "")
    });

    return next.handle(clone);
  }
}
