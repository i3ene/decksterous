import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Scopes, HasOne, BelongsToMany, DefaultScope } from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';
import { Op } from 'sequelize';
import { QueryUtil } from '../../utils/query.util';
import { Inventory } from './inventory.model';
import { Friend } from './friend.model';

@DefaultScope(() => ({
  attributes: {
    exclude: ['password']
  }
}))
@Scopes(() => ({
  query: QueryUtil.query(['id', 'name', 'mail', 'xp']),
  inventory: {
    include: [Inventory],
  },
  friend: {
    include: [{model:User, as: 'friends'}],
  },
  request: {
    include: [{model:User, as: 'requests'}],
  },
  password: {
    attributes: {
      include: ['password']
    }
  }
}))
@Table
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING(32))
  name!: string;

  @Column(DataType.STRING)
  get password(): string {
    return this.getDataValue('password');
  }
  set password(value: string) {
    this.setDataValue('password', bcrypt.hashSync(value, 8));
  }

  @Column(DataType.STRING(128))
  mail!: string;

  @Column(DataType.INTEGER)
  xp!: number;

  @Column(DataType.BLOB('long'))
  get avatar(): any {
    const data = this.getDataValue('avatar');
    return data ? data.toString('utf8') : '';
  }
  set avatar(value: any) {
    this.setDataValue('avatar', Buffer.from(value));
  }

  @HasOne(() => Inventory)
  inventory?: Inventory;

  @BelongsToMany(() => User, () => Friend, 'userId', 'friendsId')
  friends?: User[];

  @BelongsToMany(() => User, () => Friend, 'friendsId', 'userId')
  requests?: User[];
}
