import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Scopes,
  Table
} from 'sequelize-typescript';
import {QueryUtil} from '../../utils/query.util';
import {User} from './user.model';
import {_Object} from './object.model';
import {Marketplace} from './marketplace.model';
import { Item } from './item.model';
import { Card } from './card.model';
import { Deck } from './deck.model';
import { Pack } from './pack.model';

@Scopes(() => ({
  query: QueryUtil.query(['id', 'userId']),
  user: {
    include: [User]
  },
  marketplace: {
    include: [{
      model: _Object,
      include: [{
        model: Marketplace,
        required: true
      }, Item]
    }]
  },
  objects: {
    include: [{
      model: _Object,
      include: [{
        model: Item,
        include: [Card, Deck, Pack]
      }]
    }]
  }
}))
@Table
export class Inventory extends Model<Inventory> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId?: number;

  /* Relations */

  @BelongsTo(() => User)
  user?: User;

  @HasMany(() => _Object)
  objects?: _Object[];
}
