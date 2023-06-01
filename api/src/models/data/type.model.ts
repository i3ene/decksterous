import {AutoIncrement, BelongsToMany, Column, DataType, HasMany, Model, PrimaryKey, Scopes, Table} from "sequelize-typescript";
import {QueryUtil} from "../../utils/query.util";
import { Card } from "./card.model";

@Scopes(() => ({
  query: QueryUtil.query(['id', 'type', 'description']),
  cards: {
    include: [Card]
  }
}))
@Table
export class Type extends Model<Type> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING(64))
  type!: string;

  @Column(DataType.STRING(255))
  description?: string;

  /* Relations */

  @HasMany(() => Card)
  cards?: Card[];
}
