import {AutoIncrement, BelongsToMany, Column, DataType, ForeignKey, HasOne, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {Item} from '../item.model';
import {Inventory} from '../inventory.model';
import { CardDeck } from '../cardDeck.model';
import { ItemCardDeck } from './item_cardDeck.model';
import { Card } from '../card.model';

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

  @HasOne(() => Card)
  card?: Card;

  @HasOne(() => CardDeck)
  cardDeck?: CardDeck;

  @BelongsToMany(() => CardDeck, () => ItemCardDeck)
  decks?: CardDeck[];
}
