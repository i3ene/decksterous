import { Inject, Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Config } from 'src/app/config/config';
import { RequestConfig, REQUEST_CONFIG } from 'src/app/config/request.config';

@Injectable()
export class SocketConnection extends Socket {
  constructor(@Inject(REQUEST_CONFIG) request: RequestConfig) {
    super({
      url: '',
      options: {
        upgrade: false,
        path: request.url + '/socket.io',
        extraHeaders: {
          [Config.AuthHeader]: localStorage[Config.AuthToken],
        },
        transports: ['polling'],
      },
    });
  }
}
