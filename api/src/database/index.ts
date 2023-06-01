import {Inventory} from '../models/data/inventory.model';
import {Item} from '../models/data/item.model';
import {User} from '../models/data/user.model';
import {SequelizeDatabase} from './sequelize.database';
import {Card} from '../models/data/card.model';
import {Type} from '../models/data/type.model';
import {Ability} from '../models/data/ability.model';
import {CardAbility} from '../models/data/cardAbility.model';
import {Friend} from '../models/data/friend.model';
import {Deck} from '../models/data/deck.model';
import {Marketplace} from '../models/data/marketplace.model';
import {Validation} from '../models/data/validation.model';
import {Pack} from '../models/data/pack.model';
import {SubInventory} from '../models/data/subInventory.model';
import {SubObject} from '../models/data/subObject.model';
import {_Object} from '../models/data/object.model';
import {Game} from '../models/data/game.model';
import {GameHistory} from '../models/data/gameHistory.model';

SequelizeDatabase.addModels([User, Friend, Inventory, Item, Card, Type, Ability, CardAbility, Deck, Validation, Marketplace, Pack, SubInventory, SubObject, _Object, Game, GameHistory]);

export const database = SequelizeDatabase;
