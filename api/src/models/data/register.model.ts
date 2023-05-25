import { Column, DataType, Model, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { QueryUtil } from "../../utils/query.util";

@Scopes(() => ({
  query: QueryUtil.query(['token', 'mail'])
}))
@Table({ updatedAt: true, createdAt: true })
export class Register extends Model<Register> {
  @PrimaryKey
  @Column(DataType.STRING(32))
  token!: string;

  @Column(DataType.STRING(128))
  mail?: string;
}