import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Scopes, Table, Unique } from "sequelize-typescript";
import { InventoryItem } from "./relations/inventory_item.model";
import { QueryUtil } from "../../utils/query.util";
import { Item } from "./item.model";
import { Inventory } from "./inventory.model";
import { User } from "./user.model";

@Scopes(() => ({
  query: QueryUtil.query(['objectId', 'price']),
  inventoryItem: {
    include: [{
      model: InventoryItem,
      include: [Item, {
        model: Inventory,
        include: [User]
      }]
    }]
  }
}))
@Table
export class Marketplace extends Model<Marketplace> {
  @Unique
  @ForeignKey(() => InventoryItem)
  @Column(DataType.INTEGER)
  objectId!: number;

  @Default(0.0)
  @Column(DataType.DECIMAL(10, 2))
  price!: number;

  @BelongsTo(() => InventoryItem)
  inventoryItem?: InventoryItem;
}