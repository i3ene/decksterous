import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Scopes } from "sequelize-typescript";
import { Op } from "sequelize";

@Scopes(() => ({

}))
@Table
export class Item extends Model<Item> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING(32))
  name!: string;

  @Column(DataType.STRING(255))
  description?: string;
}
