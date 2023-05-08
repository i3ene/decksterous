import { Group } from "three"
import { CardThree } from "./card.three";
import * as THREE from "three";
import { Card } from "../data/card.model";
import { InteractionThree } from "./interaction.three";

export class DeckThree extends Group {

  private cards: CardThree[] = [];
  interaction: InteractionThree = new InteractionThree();

  constructor(cards: (Card | undefined)[]) {
    super();

    this.interaction.padding *= 2;
    this.add(this.interaction);

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
    for (const [index, child] of this.cards.entries()) {
      // Calculate positon based on index and card size
      child.position.y = index * CardThree.size.z;
      // Center it
      child.position.y -= (CardThree.size.z * (this.cards.length - 1)) / 2;
      // Rotate to face down
      child.rotation.x = THREE.MathUtils.degToRad(90);
    }
    // Adjust size of interaction
    this.interaction.setSize(new THREE.Vector3(CardThree.size.x, CardThree.size.z * this.cards.length, CardThree.size.y));
  }

}