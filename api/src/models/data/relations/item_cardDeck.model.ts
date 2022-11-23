import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import { Card } from '../card.model';
import { CardDeck } from '../cardDeck.model';
import { Item } from '../item.model';
import { InventoryItem } from './inventory_item.model';

@Table
export class ItemCardDeck extends Model<ItemCardDeck> {
  @ForeignKey(() => InventoryItem)
  @Column(DataType.INTEGER)
  inventoyItemId!: number;

  @ForeignKey(() => CardDeck)
  @Column(DataType.INTEGER)
  cardDeckId!: number;
}
