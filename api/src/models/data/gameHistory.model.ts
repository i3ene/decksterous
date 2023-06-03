import { BelongsTo, Column, DataType, ForeignKey, Model, Scopes, Table } from "sequelize-typescript";
import { Game } from "./game.model";
import { User } from "./user.model";
import { QueryUtil } from "../../utils/query.util";

@Scopes(() => ({
  query: QueryUtil.query(['gameId', 'userId', 'placement']),
  game: {
    include: [Game]
  },
  user: {
    include: [User]
  }
}))
@Table
export class GameHistory extends Model<GameHistory> {
  @ForeignKey(() => Game)
  @Column(DataType.INTEGER)
  gameId!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  userId!: number;

  @Column(DataType.INTEGER)
  placement!: number;

  /* Relations */

  @BelongsTo(() => Game)
  game?: Game;

  @BelongsTo(() => User)
  user?: User;
}