import {BelongsTo, Column, DataType, Default, ForeignKey, HasOne, Model, PrimaryKey, Scopes, Table} from "sequelize-typescript";
import {Inventory} from "./inventory.model";
import {Item} from "./item.model";
import {SubInventory} from "./subInventory.model";
import {Marketplace} from "./marketplace.model";
import {QueryUtil} from "../../utils/query.util";
import { Pack } from "./pack.model";
import { Deck } from "./deck.model";
import { Card } from "./card.model";
import { User } from "./user.model";

@Scopes(() => ({
  query: QueryUtil.query(['hash', 'itemId', 'inventoryId']),
  item: {
    include: [{
      model: Item,
      include: [Card, Deck, Pack]
    }]
  },
  inventory: {
    include: [Inventory]
  },
  subInventory: {
    include: [SubInventory]
  },
  marketplace: {
    include: [Marketplace]
  },
  user: {
    include: [{
      model: Inventory,
      include: [User]
    }]
  }
}))
@Table({tableName: "Object", timestamps: true})
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
