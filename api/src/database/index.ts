import {Inventory} from "../models/data/inventory.model";
import {InventoryItem} from "../models/data/inventory_item.model";
import {Item} from "../models/data/item.model";
import {User} from "../models/data/user.model";
import {SequelizeDatabase} from "./sequelize.database";
import {Card} from "../models/data/card.model";
import {CardType} from "../models/data/cardType.model";
import {CardItem} from "../models/data/card_item.model"

SequelizeDatabase.addModels([User, Inventory, Item, InventoryItem, Card, CardType, CardItem]);

export const database = SequelizeDatabase;
