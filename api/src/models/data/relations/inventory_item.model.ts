import {AutoIncrement, BelongsToMany, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {Item} from '../item.model';
import {Inventory} from '../inventory.model';
import { CardDeck } from '../cardDeck.model';
import { ItemCardDeck } from './item_cardDeck.model';

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

  @BelongsToMany(() => CardDeck, () => ItemCardDeck)
  decks?: CardDeck[];
}
