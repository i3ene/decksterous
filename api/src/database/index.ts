import { Inventory } from "../models/data/inventory.model";
import { InventoryItem } from "../models/data/inventory_item.model";
import { Item } from "../models/data/item.model";
import { User } from "../models/data/user.model";
import { SequelizeDatabase } from "./sequelize.database";

SequelizeDatabase.addModels([User, Inventory, Item, InventoryItem]);

export const database = SequelizeDatabase;