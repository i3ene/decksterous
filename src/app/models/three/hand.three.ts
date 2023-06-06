import { Group } from "three";
import { CardThree } from "./card.three";
import * as THREE from "three";
import { Card } from "../data/item.model";

export class HandThree extends Group {

  private cards: CardThree[] = [];
  public active?: number;

  constructor(cards: (Card | undefined)[]) {
    super();

    cards.forEach(x => this.addCard(new CardThree(x)));
  }

  addCards(cards: CardThree[]) {
    for(const card of cards) this.addCard(card);
  }

  addCard(card: CardThree) {
    this.cards.push(card);
    card.interaction.clicking.subscribe(x => {
      const index = this.cards.findIndex(y => y == card);
      this.active = index == this.active ? undefined : index;
      this.update();
    });
    card.position.set(0, 0, 0);
    this.add(card);
    this.update();
  }

  removeCard(card: CardThree | number): CardThree | undefined {
    const ref = typeof card == "number" ? this.cards[card] : card;
    if (ref == null) return undefined;
    const index = this.cards.findIndex(x => x == ref);
    if (index < 0) return undefined;
    const removed = this.cards.splice(index, 1)[0];
    this.remove(removed);
    this.update();
    return removed;
  }

  update() {
    for (const [index, child] of this.children.entries()) {
      // Calculate positon based on index and card size
      child.position.x = (index * CardThree.size.x);
      // Offset to deck center
      child.position.x -= (this.children.length * CardThree.size.x / 2);
      // Offset to card size center
      child.position.x += (CardThree.size.x / 2);
      
      // Rotate to face player
      child.rotation.x = THREE.MathUtils.degToRad(0);

      child.position.y = 0;
      if(this.active == index) child.position.y += 0.5;
    }
  }

}