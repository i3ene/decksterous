import { Inventory } from '../models/data/inventory.model';
import { InventoryItem } from '../models/data/relations/inventory_item.model';
import { Item } from '../models/data/item.model';
import { User } from '../models/data/user.model';
import { SequelizeDatabase } from './sequelize.database';
import { Card } from '../models/data/card.model';
import { CardType } from '../models/data/cardType.model';
import { CardAbility } from '../models/data/cardAbility.model';
import { CardCardAbility } from '../models/data/relations/card_cardAbility.model';
import { Friend } from '../models/data/friend.model';
import { CardDeck } from '../models/data/cardDeck.model';
import { InventoryItemCardDeck } from '../models/data/relations/inventoryItem_cardDeck.model';
import { Marketplace } from '../models/data/marketplace.model';
import { Register } from '../models/data/register.model';

SequelizeDatabase.addModels([User, Friend, Inventory, Item, InventoryItem, Card, CardType, CardAbility, CardCardAbility, CardDeck, InventoryItemCardDeck, Register, Marketplace]);

export const database = SequelizeDatabase;
