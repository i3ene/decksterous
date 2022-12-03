import {AllowNull, AutoIncrement, BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, PrimaryKey, Scopes, Table} from "sequelize-typescript";
import {QueryUtil} from "../../utils/query.util";
import { Card } from "./card.model";
import { InventoryItemCardDeck } from "./relations/inventoryItem_cardDeck.model";
import { Item } from "./item.model";
import { InventoryItem } from "./relations/inventory_item.model";

@Scopes(() => ({
  query: QueryUtil.query(['id', 'name', 'description']),
  inventoryItems: {
    include: [{
      model: InventoryItem,
      include: [{
        model: Item,
        include: [Card]
      }]
    }]
  },
  gameDeck: {
    include: [{
      model: InventoryItem,
      include: [{
        model: Item,
        include: [{
          model: Card,
          include: [Item]
        }]
      }]
    }]
  },
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

  @BelongsToMany(() => InventoryItem, () => InventoryItemCardDeck)
  inventoryItems?: InventoryItem[];
}
