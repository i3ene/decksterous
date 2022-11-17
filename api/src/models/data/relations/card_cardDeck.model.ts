import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import { Card } from '../card.model';
import { CardDeck } from '../cardDeck.model';

@Table
export class CardCardDeck extends Model<CardCardDeck> {
  @ForeignKey(() => Card)
  @Column(DataType.INTEGER)
  cardId!: number;

  @ForeignKey(() => CardDeck)
  @Column(DataType.INTEGER)
  cardDeckId!: number;
}