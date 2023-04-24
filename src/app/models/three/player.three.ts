import { Group } from "three";
import { DeckThree } from "./deck.three";
import { HandThree } from "./hand.three";
import { FieldThree } from "./field.three";
import { CardThree } from "./card.three";

export class PlayerThree extends Group {

  deck: DeckThree;
  hand: HandThree;
  field: FieldThree;

  constructor(fieldLength: number) {
    super();

    this.deck = new DeckThree();
    this.hand = new HandThree();
    this.field = new FieldThree(fieldLength);
    this.add(...[this.deck, this.hand, this.field]);
    
    
    this.hand.position.y = 2;
    this.hand.position.z = 3;
    this.hand.addCards(new Array(5).fill(undefined).map(x => new CardThree()));

    this.deck.position.y = 2;
    this.deck.position.x = 3;
    this.deck.position.z = 2;
    this.deck.addCards(new Array(5).fill(undefined).map(x => new CardThree()));

    this.field.position.y = 2;

    setTimeout(() => this.hand.addCards(this.deck.draw(1)), 5000);
    setTimeout(() => this.field.placeCard(this.hand.removeCard(0), 0), 6000);
    setTimeout(() => this.field.placeCard(this.hand.removeCard(0), 1), 7000);

    setTimeout(() => this.field.setLength(4), 8000);
  }

}