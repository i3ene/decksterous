import {AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {Item} from '../item.model';
import {Inventory} from '../inventory.model';

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
}
