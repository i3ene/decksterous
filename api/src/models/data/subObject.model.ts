import { BelongsTo, Column, DataType, ForeignKey, Model, Scopes, Table } from "sequelize-typescript";
import { SubInventory } from "./subInventory.model";
import { _Object } from "./object.model";
import { QueryUtil } from "../../utils/query.util";

@Scopes(() => ({
  query: QueryUtil.query(['subInventoryId', 'objectHash']),
  object: {
    include: [_Object]
  },
  subInventory: {
    include: [SubInventory]
  }
}))
@Table
export class SubObject extends Model<SubObject> {
  @ForeignKey(() => SubInventory)
  @Column(DataType.INTEGER)
  subInventoryId!: number;

  @ForeignKey(() => _Object)
  @Column(DataType.UUID)
  objectHash!: string;

  /* Relations */

  @BelongsTo(() => SubInventory)
  subInventory?: SubInventory;

  @BelongsTo(() => _Object)
  object?: _Object;
}