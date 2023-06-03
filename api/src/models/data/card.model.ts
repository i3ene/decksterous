import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Scopes,
  Table
} from "sequelize-typescript";
import {QueryUtil} from "../../utils/query.util";
import {Ability} from "./ability.model";
import {Type} from "./type.model";
import {CardAbility} from "./cardAbility.model";
import {Item} from "./item.model";

@Scopes(() => ({
  query: QueryUtil.query(['id', 'typeId', 'health', 'damage', 'cost', 'itemId']),
  item: {
    include: [Item]
  },
  type: {
    include: [Type]
  },
  abilities: {
    include: [Ability]
  }
}))
@Table
export class Card extends Model<Card> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Type)
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

  /* Relations */

  @BelongsTo(() => Item)
  item?: Item;

  @BelongsTo(() => Type)
  type?: Type;

  @BelongsToMany(() => Ability, () => CardAbility)
  abilities?: Ability[];
}
