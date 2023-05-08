import { Group } from "three"
import { CardThree } from "./card.three";
import * as THREE from "three";
import { Card } from "../data/card.model";

export class DeckThree extends Group {

  private cards: CardThree[] = [];

  constructor(cards: (Card | undefined)[]) {
    super();

    cards.forEach(x => this.addCard(new CardThree(x)));
  }

  addCards(cards: CardThree[]) {
    for(const card of cards) this.addCard(card);
  }

  addCard(card: CardThree) {
    this.cards.push(card);
    this.add(card);
    this.update();
  }

  draw(amount: number): CardThree[] {
    const cards = this.cards.splice(0, amount);
    cards.forEach(card => this.remove(card));
    this.update();
    return cards;
  }

  update() {
    for (const [index, child] of this.children.entries()) {
      // Calculate positon based on index and card size
      child.position.y = index * CardThree.size.z;
      // Rotate to face down
      child.rotation.x = THREE.MathUtils.degToRad(90);
    }
  }

}