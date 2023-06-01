import { AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { Item } from "./item.model";
import { _Object } from "./object.model";
import { QueryUtil } from "../../utils/query.util";

@Scopes(() => ({
  query: QueryUtil.query(['id', 'itemId', 'rarity']),
  item: {
    include: [Item]
  }
}))
@Table
export class Pack extends Model<Pack> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Item)
  @Column(DataType.INTEGER)
  itemId!: number;

  @Default(0)
  @Column(DataType.INTEGER)
  rarity!: number;

  /* Relations */

  @BelongsTo(() => Item)
  item?: Item;
}