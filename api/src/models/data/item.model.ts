import {AllowNull, AutoIncrement, Column, DataType, HasOne, Model, PrimaryKey, Scopes, Table} from "sequelize-typescript";
import {QueryUtil} from "../../utils/query.util";
import {Card} from "./card.model";
import {Deck} from "./deck.model";
import {Pack} from "./pack.model";

@Scopes(() => ({
  query: QueryUtil.query(['id', 'name', 'description']),
  card: {
    include: [Card]
  },
  deck: {
    include: [Deck]
  },
  pack: {
    include: [Pack]
  }
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
  @HasOne(() => Card)
  card?: Card;
  @HasOne(() => Deck)
  deck?: Deck;

  /* Relations */
  @HasOne(() => Pack)
  pack?: Pack;

  @AllowNull
  @Column(DataType.BLOB('long'))
  get image(): any {
    const data = this.getDataValue('image');
    return data ? data.toString('utf8') : '';
  }

  set image(value: any) {
    this.setDataValue('image', value);
  }
}
