import {AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Scopes, Table} from "sequelize-typescript";
import {QueryUtil} from "../../utils/query.util";
import { CardAbility } from "./cardAbility.model";
import {CardType} from "./cardType.model";
import { CardCardAbility } from "./card_cardAbility.model";
import { Item } from "./item.model";

@Scopes(() => ({
  query: QueryUtil.query(['id', 'typeId', 'health', 'damage', 'cost', 'itemId']),
  item: {
    include: [Item]
  },
  ability: {
    include: [CardAbility]
  }
}))
@Table
export class Card extends Model<Card> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => CardType)
  @Column(DataType.INTEGER)
  typeId!: number;

  @Column(DataType.INTEGER)
  health!: number;

  @Column(DataType.INTEGER)
  damage!: number;

  @Column(DataType.INTEGER)
  cost!: number;

  @ForeignKey(() => Item)
  @Column(DataType.INTEGER)
  itemId!: number;

  @BelongsTo(() => Item)
  item?: Item;

  @BelongsToMany(() => CardAbility, () => CardCardAbility)
  abilities?: CardAbility[];
}
