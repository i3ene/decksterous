import secret from "./secret.json";

export namespace DatabaseConfig {
  export const LOGGING: any = console.log;
  export const HOST: string = secret.database.host;
  export const USER: string = secret.database.user;
  export const PASSWORD: string = secret.database.password;
  export const DB: string = secret.database.db;
  export const dialect: string = 'mariadb';
  export const pool: any = {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  };
}
