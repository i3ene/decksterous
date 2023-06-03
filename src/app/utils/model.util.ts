import { Card, Deck, Item, ItemAny, ItemFactory, Pack } from "../models/data/item.model";
import { ModelParsable, ObjectFactory, _Object } from "../models/data/object.model";

export namespace ModelUtils {
  export function parseArray<T>(type: ModelParsable<T>, obj?: any): T[] {
    if (obj && Array.isArray(obj)) return obj.map(x => new type(x));
    return [];
  }

  export function parseItem(obj?: any): any & ItemAny {
    const type = itemType(obj);
    return new ItemFactory(type).parse(obj);
  }

  export function parseObject(obj?: any): _Object<any> {
    const type = itemType(obj?.item);
    return new ObjectFactory(type).parse(obj);
  }

  export function itemType(item?: any): ModelParsable<any> {
    var type: ModelParsable<any> = Item;
    if (item?.card) type = Card;
    if (item?.deck) type = Deck;
    if (item?.pack) type = Pack;
    return type;
  }
}