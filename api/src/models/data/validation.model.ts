import { Column, DataType, Default, Model, PrimaryKey, Scopes, Table } from "sequelize-typescript";
import { QueryUtil } from "../../utils/query.util";

@Scopes(() => ({
  query: QueryUtil.query(['token', 'mail', 'type'])
}))
@Table({ updatedAt: true, createdAt: true })
export class Validation extends Model<Validation> {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  token!: string;

  @Column(DataType.STRING(128))
  mail?: string;

  @Column(DataType.STRING(32))
  type?: string;
}