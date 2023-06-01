import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Scopes, HasMany, BelongsToMany, HasOne, ForeignKey, AllowNull } from "sequelize-typescript";
import { QueryUtil } from "../../utils/query.util";
import { Inventory } from "./inventory.model";
import { Card } from "./card.model";
import { _Object } from "./object.model";
import { Deck } from "./deck.model";
import { Pack } from "./pack.model";

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

  @AllowNull
  @Column(DataType.BLOB('long'))
  get image(): any {
    const data = this.getDataValue('image');
    return data ? data.toString('utf8') : '';
  }
  set image(value: any) {
    this.setDataValue('image', value);
  }

  /* Relations */

  @HasOne(() => Card)
  card?: Card;

  @HasOne(() => Deck)
  deck?: Deck;

  @HasOne(() => Pack)
  pack?: Pack;
}
