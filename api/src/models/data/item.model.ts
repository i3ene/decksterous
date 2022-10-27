import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Scopes, HasMany, BelongsToMany } from "sequelize-typescript";
import { Op } from "sequelize";
import { QueryUtil } from "../../utils/query.util";
import { Inventory } from "./inventory.model";
import { InventoryItem } from "./inventory_item.model";

@Scopes(() => ({
  query: QueryUtil.query(['id', 'name', 'description'])
}))
@Table
export class Item extends Model<Item> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING(32))
  name!: string;

  @Column(DataType.STRING(255))
  description?: string;

  @BelongsToMany(() => Inventory, () => InventoryItem)
  inventories?: Inventory[];
}
