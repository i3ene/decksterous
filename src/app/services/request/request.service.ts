import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { DEFAULT_PATH, PathRequest } from './path.request';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(@Inject(DEFAULT_PATH) public config: PathRequest, private http: HttpClient) {}

  get(url: string, options: any = { responseType: 'json' }): Promise<any> {
    return firstValueFrom(this.http.get(this.config.path + url, options));
  }

  post(url: string, body: any, options: any = { responseType: 'json' }): Promise<any> {
    return firstValueFrom(this.http.post(this.config.path + url, body, options));
  }

  put(url: string, body: any, options: any = { responseType: 'json' }): Promise<any> {
    return firstValueFrom(this.http.put(this.config.path + url, body, options));
  }

  delete(url: string, body?: any /*, options: any*/): Promise<any> {
    if (body) {
      const options = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
        body: body,
      };
      return firstValueFrom(this.http.delete(this.config.path + url, options));
    } else {
      return firstValueFrom(this.http.delete(this.config.path + url /*, options*/));
    }
  }
}
