import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Config } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  getTokenData(): any {
    const token = localStorage[Config.AuthToken];
    if (token == undefined) return undefined;

    const helper = new JwtHelperService();
    const payload = helper.decodeToken(token);

    return payload;
  }

  getTokenDate(): any {
    const token = localStorage[Config.AuthToken];
    if (token == undefined) return undefined;

    const helper = new JwtHelperService();
    const date = helper.getTokenExpirationDate(token);

    return date;
  }

}
