import {BelongsTo, Column, DataType, ForeignKey, Model, Scopes, Table} from 'sequelize-typescript';
import { User } from './user.model';
import { QueryUtil } from '../../utils/query.util';

@Scopes(() => ({
  query: QueryUtil.query(['userId', 'friendsId']),
  user: {
    include: [{
      model:User,
      as: 'user'
    }],
  },
  friend: {
    include: [{
      model:User,
      as: 'friend'
    }],
  }
}))
@Table({ createdAt: true })
export class Friend extends Model<Friend> {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  friendsId!: number;

  /* Relations */

  @BelongsTo(() => User)
  user?: User;

  @BelongsTo(() => User)
  friend?: User;
}