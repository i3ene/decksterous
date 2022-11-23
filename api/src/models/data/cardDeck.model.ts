import {AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Scopes, Table} from "sequelize-typescript";
import {QueryUtil} from "../../utils/query.util";
import { Card } from "./card.model";
import { ItemCardDeck } from "./relations/item_cardDeck.model";
import { Item } from "./item.model";
import { InventoryItem } from "./relations/inventory_item.model";

@Scopes(() => ({
  query: QueryUtil.query(['id', 'name', 'description']),
  items: {
    include: [{
      model: InventoryItem,
      include: [Item]
    }]
  }
}))
@Table
export class CardDeck extends Model<CardDeck> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @ForeignKey(() => Item)
  @Column(DataType.INTEGER)
  itemId!: number;

  @BelongsToMany(() => InventoryItem, () => ItemCardDeck)
  items?: InventoryItem[];
}
