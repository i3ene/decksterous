import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Card } from './card.model';
import { CardAbility } from './cardAbility.model';

@Table
export class CardCardAbility extends Model<CardCardAbility> {
  @ForeignKey(() => Card)
  @Column(DataType.INTEGER)
  cardId!: number;

  @ForeignKey(() => CardAbility)
  @Column(DataType.INTEGER)
  cardAbilityId!: number;
}
