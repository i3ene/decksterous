import { BelongsTo, Column, DataType, ForeignKey, Model, Scopes, Table } from 'sequelize-typescript';
import { Card } from './card.model';
import { Ability } from './ability.model';
import { QueryUtil } from '../../utils/query.util';

@Scopes(() => ({
  query: QueryUtil.query(['cardId', 'abilityId']),
  card: {
    include: [Card]
  },
  ability: {
    include: [Ability]
  }
}))
@Table
export class CardAbility extends Model<CardAbility> {
  @ForeignKey(() => Card)
  @Column(DataType.INTEGER)
  cardId!: string;

  @ForeignKey(() => Ability)
  @Column(DataType.STRING(32))
  abilityKey!: number;

  /* Relations */

  @BelongsTo(() => Card)
  card?: Card;

  @BelongsTo(() => Ability)
  ability?: Ability;
}
