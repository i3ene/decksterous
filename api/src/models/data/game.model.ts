import {AutoIncrement, BelongsToMany, Column, DataType, Model, PrimaryKey, Scopes, Table} from "sequelize-typescript";
import {User} from "./user.model";
import {GameHistory} from "./gameHistory.model";
import {QueryUtil} from "../../utils/query.util";

@Scopes(() => ({
  query: QueryUtil.query(['id']),
  users: {
    include: [User]
  }
}))
@Table
export class Game extends Model<Game> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  // TODO: Timestamps

  /* Relations */

  @BelongsToMany(() => User, () => GameHistory)
  users?: User[];
}
