import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {Item} from './item.model';
import {Card} from "./card.model";

@Table
export class InventoryItem extends Model<InventoryItem> {
  @ForeignKey(() => Card)
  @Column(DataType.INTEGER)
  cardId!: number;

  @ForeignKey(() => Item)
  @Column(DataType.INTEGER)
  itemId!: number;
}
