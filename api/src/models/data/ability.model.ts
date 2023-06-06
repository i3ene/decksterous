import {BelongsToMany, Column, DataType, Model, PrimaryKey, Scopes, Table} from "sequelize-typescript";
import {QueryUtil} from "../../utils/query.util";
import {Card} from "./card.model";
import {CardAbility} from "./cardAbility.model";

@Scopes(() => ({
  query: QueryUtil.query(['key', 'name', 'description']),
  cards: {
    include: [Card]
  }
}))
@Table
export class Ability extends Model<Ability> {
  @PrimaryKey
  @Column(DataType.STRING(32))
  key!: string;

  @Column(DataType.STRING(64))
  name!: string;

  @Column(DataType.STRING(255))
  description?: string;

  /* Relations */

  @BelongsToMany(() => Card, () => CardAbility)
  cards?: Card[];
}
