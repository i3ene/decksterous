import { BelongsTo, Column, DataType, Default, ForeignKey, HasOne, Model, PrimaryKey, Scopes, Table, Unique } from "sequelize-typescript";
import { Inventory } from "./inventory.model";
import { Item } from "./item.model";
import { SubInventory } from "./subInventory.model";
import { Marketplace } from "./marketplace.model";
import { QueryUtil } from "../../utils/query.util";

@Scopes(() => ({
  query: QueryUtil.query(['hash', 'itemId', 'inventoryId']),
  item: {
    include: [Item]
  },
  inventory: {
    include: [Inventory]
  },
  subInventory: {
    include: [SubInventory]
  },
  marketplace: {
    include: [Marketplace]
  }
}))
@Table({ tableName: "Object", timestamps: true })
export class _Object extends Model<_Object> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  hash!: string;

  @ForeignKey(() => Inventory)
  @Column(DataType.INTEGER)
  inventoryId?: number;

  @ForeignKey(() => Item)
  @Column(DataType.INTEGER)
  itemId!: number;

  /* Relations */

  @BelongsTo(() => Item)
  item?: Item;

  @BelongsTo(() => Inventory)
  inventory?: Inventory;

  @HasOne(() => SubInventory)
  subInventory?: SubInventory;

  @HasOne(() => Marketplace)
  marketplace?: Marketplace;
}