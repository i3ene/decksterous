import { Dialect, OperatorsAliases } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { DatabaseConfig } from '../config/database.config';

export const SequelizeDatabase = new Sequelize(
  DatabaseConfig.DB,
  DatabaseConfig.USER,
  DatabaseConfig.PASSWORD,
  {
    logging: DatabaseConfig.LOGGING,
    host: DatabaseConfig.HOST,
    dialect: DatabaseConfig.dialect as Dialect,
    operatorsAliases: 0 as unknown as OperatorsAliases,
    pool: {
      max: DatabaseConfig.pool.max,
      min: DatabaseConfig.pool.min,
      acquire: DatabaseConfig.pool.acquire,
      idle: DatabaseConfig.pool.idle,
    },
  }
);
