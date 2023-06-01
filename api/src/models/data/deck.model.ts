import {AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, Default, ForeignKey, HasMany, Model, PrimaryKey, Scopes, Table} from "sequelize-typescript";
import {QueryUtil} from "../../utils/query.util";
import { Item } from "./item.model";
import { _Object } from "./object.model";

@Scopes(() => ({
  query: QueryUtil.query(['id', 'itemId', 'maxCards']),
  item: {
    include: [Item]
  }
}))
@Table
export class Deck extends Model<Deck> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Item)
  @Column(DataType.INTEGER)
  itemId!: number;

  @Default(0)
  @Column(DataType.INTEGER)
  maxCards!: number;

  /* Relations */

  @BelongsTo(() => Item)
  item?: Item;

  // TODO
  objects?: _Object[];
}
