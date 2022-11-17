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
import { CardCardDeck } from '../models/data/relations/card_cardDeck.model';

SequelizeDatabase.addModels([User, Friend, Inventory, Item, InventoryItem, Card, CardType, CardAbility, CardCardAbility, CardDeck, CardCardDeck]);

export const database = SequelizeDatabase;
