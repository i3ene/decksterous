import { Group } from "three";
import { CardThree } from "./card.three";
import * as THREE from "three";

export class FieldThree extends Group {

  private length!: number;
  private cards!: Array<CardThree | undefined>;
  private padding: number = 0.25;

  material: THREE.Material = new THREE.LineBasicMaterial({
    color: 0x0000ff
  });
  
  points!: THREE.Vector3[];  
  geometry!: THREE.BufferGeometry;
  line!: THREE.Line;

  constructor(length: number) {
    super();
    this.setLength(length);
  }

  setLength(length: number) {
    this.length = length;
    const copy = this.cards;
    this.cards = new Array(length).fill(undefined);

    this.redraw();

    if (copy) {;
      for (const [index, card] of this.cards.entries()) {
        this.cards[index] = copy[index];
      }
    }
    this.update();
  }

  placeCard(card: CardThree | undefined, index: number): boolean {
    if (index > this.length || index < 0) return false;
    this.cards[index] = card;

    if (card) this.add(card);
    this.update();

    return true;
  }

  removeCard(index: number): CardThree | undefined {
    const card = this.cards[index];
    this.cards[index] = undefined;
    if (card) this.remove(card);
    this.update();
    return card;
  }

  getIndex(card: CardThree): number {
    return this.cards.findIndex(x => x == card);
  }

  update() {
    for (const child of this.children) {
      const index = this.getIndex(child as CardThree);
      if (index < 0) continue;
      const width = (CardThree.size.x + (2 * this.padding));
      // Calculate positon based on index and card size
      child.position.x = (index * width);
      // Offset to field center
      child.position.x -= (this.length * width / 2);
      // Offset to card size center
      child.position.x += (width / 2);
      
      // Rotate to face up
      child.rotation.x = THREE.MathUtils.degToRad(-90);
    }
  }

  redraw() {
    this.points = [];
    
    const width = (CardThree.size.x + (2 * this.padding));
    const height = (CardThree.size.y + (2 * this.padding));
    for (const [index, card] of this.cards.entries()) {
      const point = (index * width);
      this.points.push(new THREE.Vector3(point, 0, -height));
      this.points.push(new THREE.Vector3(point + width, 0, -height));
      this.points.push(new THREE.Vector3(point + width, 0, 0));
      this.points.push(new THREE.Vector3(point, 0, 0));
      this.points.push(new THREE.Vector3(point, 0, -height));
    }

    this.geometry = new THREE.BufferGeometry().setFromPoints(this.points);
    if (this.line) this.remove(this.line);
    this.line = new THREE.Line(this.geometry, this.material);
    this.add(this.line);
    this.line.position.x -= (this.length * width / 2);
    this.line.position.z += (height / 2);
  }

}