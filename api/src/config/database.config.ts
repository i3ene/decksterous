export namespace DatabaseConfig {
  export const LOGGING: any = console.log;
  export const HOST: string = ***REMOVED***;
  export const USER: string = ***REMOVED***;
  export const PASSWORD: string = ***REMOVED***;
  export const DB: string = ***REMOVED***;
  export const dialect: string = 'mariadb';
  export const pool: any = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  };
}
