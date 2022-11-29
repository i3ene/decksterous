import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Scopes, ForeignKey, BelongsTo, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Op } from 'sequelize';
import { QueryUtil } from '../../utils/query.util';
import { User } from './user.model';
import { Item } from './item.model';
import { InventoryItem } from './relations/inventory_item.model';
import { Card } from './card.model';
import { CardDeck } from './cardDeck.model';

@Scopes(() => ({
  query: QueryUtil.query(['id', 'userId']),
  items: {
    include: [{
      model: Item,
      include: [Card, CardDeck]
    }]
  },
  user: {
    include: [User]
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

  @BelongsTo(() => User)
  user?: User;

  @BelongsToMany(() => Item, () => InventoryItem)
  items?: Item[];
}
