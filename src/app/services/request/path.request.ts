import { InjectionToken } from '@angular/core';

export const DEFAULT_PATH = new InjectionToken<PathRequest>('default_path');

export interface PathRequest {
  /**
   * URL of API
   */
  path: string;
}
