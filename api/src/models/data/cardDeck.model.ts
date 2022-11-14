import {AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Scopes, Table} from "sequelize-typescript";
import {QueryUtil} from "../../utils/query.util";
import { Card } from "./card.model";
import { CardCardDeck } from "./card_cardDeck.model";
import { Item } from "./item.model";

@Scopes(() => ({
  query: QueryUtil.query(['id', 'name', 'description']),
  cards: {
    include: [Card]
  }
}))
@Table
export class CardDeck extends Model<CardDeck> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Item)
  @Column(DataType.INTEGER)
  itemId!: number;

  @BelongsToMany(() => Card, () => CardCardDeck)
  cards?: Card[];
}
