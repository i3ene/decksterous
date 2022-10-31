import {Inventory} from "../models/data/inventory.model";
import {InventoryItem} from "../models/data/inventory_item.model";
import {Item} from "../models/data/item.model";
import {User} from "../models/data/user.model";
import {SequelizeDatabase} from "./sequelize.database";
import {Card} from "../models/data/card.model";
import {CardType} from "../models/data/cardType.model";

SequelizeDatabase.addModels([User, Inventory, Item, InventoryItem, Card, CardType]);

export const database = SequelizeDatabase;
