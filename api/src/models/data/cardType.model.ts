import {AutoIncrement, Column, DataType, HasMany, Model, PrimaryKey, Scopes, Table} from "sequelize-typescript";
import {QueryUtil} from "../../utils/query.util";
import {Card} from "./card.model";

@Scopes(() => ({
  query: QueryUtil.query(['id', 'type']),
  cards: {
    include: [Card]
  }
}))
@Table
export class CardType extends Model<CardType> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING(64))
  type!: string;

  @HasMany(() => Card)
  cards?: Card[];
}
