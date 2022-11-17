import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import {Item} from '../item.model';
import {Inventory} from '../inventory.model';

@Table
export class InventoryItem extends Model<InventoryItem> {
  @ForeignKey(() => Inventory)
  @Column(DataType.INTEGER)
  inventoryId!: number;

  @ForeignKey(() => Item)
  @Column(DataType.INTEGER)
  itemId!: number;
}
