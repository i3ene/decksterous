import { AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, PrimaryKey, Scopes, Table, Unique } from "sequelize-typescript";
import { _Object } from "./object.model";
import { QueryUtil } from "../../utils/query.util";
import { SubObject } from "./subObject.model";

@Scopes(() => ({
  query: QueryUtil.query(['id', 'objectHash']),
  object: {
    include: [{
      model: SubObject,
      as: 'object'
    }]
  },
  objects: {
    include: [{
      model: SubObject,
      as: 'objects'
    }]
  }
}))
@Table
export class SubInventory extends Model<SubInventory> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Unique
  @ForeignKey(() => _Object)
  @Column(DataType.UUID)
  objectHash!: string;

  /* Relations */

  @BelongsTo(() => _Object)
  object?: _Object;

  @BelongsToMany(() => _Object, () => SubObject)
  objects?: _Object[];
}