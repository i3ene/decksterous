import {AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, PrimaryKey, Scopes, Table} from "sequelize-typescript";
import {QueryUtil} from "../../utils/query.util";
import { Card } from "./card.model";
import { CardCardAbility } from "./relations/card_cardAbility.model";

@Scopes(() => ({
  query: QueryUtil.query(['key', 'name', 'description']),
  cards: {
    include: [Card]
  }
}))
@Table
export class CardAbility extends Model<CardAbility> {
  @PrimaryKey
  @Column(DataType.STRING(64))
  key!: string;

  @Column(DataType.STRING(64))
  name!: string;

  @Column(DataType.STRING(255))
  description!: string;

  @BelongsToMany(() => Card, () => CardCardAbility)
  cards?: Card[];
}
