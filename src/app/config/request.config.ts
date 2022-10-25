import { InjectionToken } from '@angular/core';

export const REQUEST_CONFIG = new InjectionToken<RequestConfig>('request_config');

export interface RequestConfig {
  /**
   * URL of API
   */
  url: string;
}
