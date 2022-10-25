import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { REQUEST_CONFIG, RequestConfig } from '../../config/request.config';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(@Inject(REQUEST_CONFIG) public config: RequestConfig, private http: HttpClient) {}

  get(url: string, options: any = { responseType: 'json' }): Promise<any> {
    return firstValueFrom(this.http.get(this.config.url + url, options));
  }

  post(url: string, body: any, options: any = { responseType: 'json' }): Promise<any> {
    return firstValueFrom(this.http.post(this.config.url + url, body, options));
  }

  put(url: string, body: any, options: any = { responseType: 'json' }): Promise<any> {
    return firstValueFrom(this.http.put(this.config.url + url, body, options));
  }

  delete(url: string, body?: any /*, options: any*/): Promise<any> {
    if (body) {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: body,
      };
      return firstValueFrom(this.http.delete(this.config.url + url, options));
    } else {
      return firstValueFrom(this.http.delete(this.config.url + url /*, options*/));
    }
  }
}
