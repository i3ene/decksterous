import {AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Scopes, Table} from "sequelize-typescript";
import {QueryUtil} from "../../utils/query.util";
import {Item} from "./item.model";
import {User} from "./user.model";
import {CardType} from "./cardType.model";
import {BlobDataType} from "sequelize";

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
export class Card extends Model<Card> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => CardType)
  @Column(DataType.INTEGER)
  typeId!: number;


  @Column(DataType.INTEGER)
  hp!: number;

  @Column(DataType.INTEGER)
  atk!: number;

  @Column(DataType.BLOB)
  get img(): any {
    const data = this.getDataValue('img');
    return data ? data.toString('utf8') : '';
  }
  set img(value: any) {
    this.setDataValue('img', value);
  }

}
