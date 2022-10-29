import {AutoIncrement, Column, DataType, Model, PrimaryKey, Scopes, Table} from "sequelize-typescript";
import {QueryUtil} from "../../utils/query.util";
import {Item} from "./item.model";
import {User} from "./user.model";

@Scopes(() => ({
  query: QueryUtil.query(['id', 'userId']),
  items: {
    include: [Item]
  },
  user: {
    include: [User]
  }
}))
@Table
export class CardType extends Model<CardType> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING(64))
  type!: string;
}
