import { BelongsTo, Column, DataType, Default, ForeignKey, Model, PrimaryKey, Scopes, Table, Unique } from "sequelize-typescript";
import { QueryUtil } from "../../utils/query.util";
import { Item } from "./item.model";
import { Inventory } from "./inventory.model";
import { User } from "./user.model";
import { _Object } from "./object.model";

@Scopes(() => ({
  query: QueryUtil.query(['objectId', 'price']),
  user: {
    include: [{
      model: _Object,
      include: [Item, {
        model: Inventory,
        include: [User]
      }]
    }]
  },
  object: {
    include: [_Object]
  }
}))
@Table({ timestamps: true })
export class Marketplace extends Model<Marketplace> {
  @PrimaryKey
  @ForeignKey(() => _Object)
  @Column(DataType.UUID)
  objectHash!: string;

  @Default(0)
  @Column(DataType.INTEGER)
  price!: number;

  /* Relations */

  @BelongsTo(() => _Object)
  object?: _Object;
}
