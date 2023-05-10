import {AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, PrimaryKey, Scopes, Table} from 'sequelize-typescript';
import {Item} from '../item.model';
import {Inventory} from '../inventory.model';
import { CardDeck } from '../cardDeck.model';
import { InventoryItemCardDeck } from './inventoryItem_cardDeck.model';
import { Card } from '../card.model';
import { Marketplace } from '../marketplace.model';

@Scopes(() => ({
  marketplace: {
    include: [Marketplace]
  }
}))
@Table
export class InventoryItem extends Model<InventoryItem> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Inventory)
  @Column(DataType.INTEGER)
  inventoryId!: number;

  @ForeignKey(() => Item)
  @Column(DataType.INTEGER)
  itemId!: number;

  @BelongsTo(() => Item)
  item?: Item;

  @BelongsTo(() => Inventory)
  inventory?: Inventory;

  @BelongsToMany(() => CardDeck, () => InventoryItemCardDeck)
  decks?: CardDeck[];

  @HasOne(() => Marketplace)
  marketplace?: Marketplace;
}
