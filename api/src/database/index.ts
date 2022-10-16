import { User } from "../models/data/user.model";
import { SequelizeDatabase } from "./sequelize.database";

SequelizeDatabase.addModels([User]);

export const db = SequelizeDatabase;