import { Group } from "three"
import { CardObject } from "./card.three";
import { Card } from "../data/card.model";

export class DeckThree extends Group {

  private cards: CardObject[] = [];

  constructor() {
    super();
  }

  addCards(cards: CardObject[]) {
    for(const card of cards) this.addCard(card);
  }

  addCard(card: CardObject) {
    this.cards.push(card);
    this.add(card);
    for (const [index, child] of this.children.entries()) {
      child.position.x = Math.sin((index / this.children.length) * 2 * Math.PI) * 2;
    }
  }

  removeCard(card: CardObject | number): CardObject | undefined {
    const ref = typeof card == "number" ? this.cards[card] : card;
    if (ref == null) return undefined;
    const index = this.cards.findIndex(x => x == ref);
    if (index < 0) return undefined;
    return this.cards.splice(index, 1)[0];
  }

}