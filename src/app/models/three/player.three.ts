import { Group } from "three";
import { DeckThree } from "./deck.three";
import { HandThree } from "./hand.three";
import { FieldThree } from "./field.three";
import { CardThree } from "./card.three";

export class PlayerThree extends Group {

  deck: DeckThree;
  hand: HandThree;
  field: FieldThree;

  constructor(obj: any) {
    super();

    this.deck = new DeckThree(obj.deck ?? []);
    this.hand = new HandThree(obj.cards ?? []);
    this.field = new FieldThree((obj.field ?? []).length);
    this.add(...[this.deck, this.hand, this.field]);
    
    
    this.hand.position.y = 2.75;
    this.hand.position.z = 3;

    this.deck.position.y = 2;
    this.deck.position.x = 3;
    this.deck.position.z = 2;

    this.field.position.y = 2;
  }

}