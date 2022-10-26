import secret from './secret.json';

export namespace AuthConfig {
  export const SECRET = secret.auth.secret;
  export const HEADER = 'x-access-token';
}
