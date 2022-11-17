import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { firstValueFrom } from 'rxjs';
import { REQUEST_CONFIG, RequestConfig } from '../../config/request.config';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(@Inject(REQUEST_CONFIG) public config: RequestConfig, private http: HttpClient, private dialog: MatSnackBar) {}

  get(url: string, options: any = { responseType: 'json' }): Promise<any> {
    return firstValueFrom(this.http.get(this.config.url + url, options)).then(res => { this.display(res); return res });
  }

  post(url: string, body: any, options: any = { responseType: 'json' }): Promise<any> {
    return firstValueFrom(this.http.post(this.config.url + url, body, options)).then(res => { this.display(res); return res });
  }

  put(url: string, body: any, options: any = { responseType: 'json' }): Promise<any> {
    return firstValueFrom(this.http.put(this.config.url + url, body, options)).then(res => { this.display(res); return res });
  }

  delete(url: string, body?: any, options: any = {}): Promise<any> {
    if (body) {
      options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: body,
      };
    }
    return firstValueFrom(this.http.delete(this.config.url + url, options)).then(res => { this.display(res); return res });
  }

  display(response: any) {
    if (!response.message) return;
    this.dialog.open(response.message, "Ok", {
      duration: 2500
    });
  }
}
