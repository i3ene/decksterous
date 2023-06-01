import { Dialect, OperatorsAliases } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Config } from '../config';

export const SequelizeDatabase = new Sequelize(
  Config.Database.DB,
  Config.Database.USER,
  Config.Database.PASSWORD,
  {
    logging: Config.Database.LOGGING,
    host: Config.Database.HOST,
    dialect: Config.Database.dialect as Dialect,
    operatorsAliases: 0 as unknown as OperatorsAliases,
    pool: {
      max: Config.Database.pool.max,
      min: Config.Database.pool.min,
      acquire: Config.Database.pool.acquire,
      idle: Config.Database.pool.idle,
    },
    define: {
      freezeTableName: true,
      timestamps: false
    }
  }
);
