import secret from './secret.json';
import config from './config.json';

export namespace AuthConfig {
  export const SECRET = secret.auth.secret;
  export const HEADER = config.auth.header;
  export const ADMIN_ID = config.auth.admin_id;
}
