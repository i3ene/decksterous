import {Column, DataType, ForeignKey, Model, Table} from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Friend extends Model<Friend> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  friendsId!: number;
}