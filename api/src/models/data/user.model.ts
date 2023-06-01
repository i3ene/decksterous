import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Scopes, HasOne, BelongsToMany, DefaultScope, Default } from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';
import { QueryUtil } from '../../utils/query.util';
import { Inventory } from './inventory.model';
import { Friend } from './friend.model';
import { _Object } from './object.model';
import { Item } from './item.model';
import { RequestUtils } from '../../utils/request.util';
import { RequestDifference } from '../object/request.model';

@DefaultScope(() => ({
  attributes: {
    exclude: ['password']
  }
}))
@Scopes(() => ({
  query: QueryUtil.query(['id', 'name', 'mail', 'xp', 'coins']),
  inventory: {
    include: [Inventory],
  },
  objects: {
    include: [{
      model: Inventory,
      include: [{
        model: _Object,
        include: [Item]
      }]
    }],
  },
  friend: {
    include: [
      {model:User, as: 'invites'},
      {model:User, as: 'requests'}
    ],
  },
  invite: {
    include: [{model:User, as: 'invites'}],
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
@Table({ timestamps: true })
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

  @Default(0)
  @Column(DataType.INTEGER)
  xp!: number;

  @Default(0)
  @Column(DataType.INTEGER)
  coins!: number;

  @Column(DataType.BLOB('long'))
  get avatar(): any {
    const data = this.getDataValue('avatar');
    return data ? data.toString('utf8') : '';
  }
  set avatar(value: any) {
    this.setDataValue('avatar', Buffer.from(value));
  }

  /* Relations */

  @HasOne(() => Inventory)
  inventory?: Inventory;

  @BelongsToMany(() => User, () => Friend, 'userId', 'friendsId')
  invites?: User[];

  @BelongsToMany(() => User, () => Friend, 'friendsId', 'userId')
  requests?: User[];

  get friends() {
    return {
      accepted: this.friendAccepted,
      invites: this.friendInvites,
      requsts: this.friendRequests
    };
  }

  get friendAccepted(): User[] | undefined {
    return this.friend("accepted");
  }

  get friendInvites(): User[] | undefined {
    return this.friend("invites");
  }
  
  get friendRequests(): User[] | undefined {
    return this.friend("requests");
  }

  friend(type: "requests" | "invites" | "accepted") {
    var diff: RequestDifference;
    switch(type) {
      case "accepted": diff = "intersection"; break;
      case "invites": diff = "left"; break;
      case "requests": diff = "right"; break;
    }
    if (!this.invites || !this.requests) return undefined;
    return RequestUtils.difference(diff!, this.invites, this.requests, "id");
  }
}
