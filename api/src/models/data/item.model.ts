import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Scopes, HasMany, BelongsToMany, HasOne, ForeignKey, AllowNull } from "sequelize-typescript";
import { Op } from "sequelize";
import { QueryUtil } from "../../utils/query.util";
import { Inventory } from "./inventory.model";
import { InventoryItem } from "./inventory_item.model";
import { Card } from "./card.model";
import { CardDeck } from "./cardDeck.model";

@Scopes(() => ({
  query: QueryUtil.query(['id', 'name', 'description']),
  inventories: {
    include: [Inventory]
  },
  card: {
    include: [Card]
  },
  cardDeck: {
    include: [CardDeck]
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

  @BelongsToMany(() => Inventory, () => InventoryItem)
  inventories?: Inventory[];

  @HasOne(() => Card)
  card?: Card;

  @HasOne(() => CardDeck)
  cardDeck?: CardDeck;
}
