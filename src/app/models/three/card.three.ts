import { BoxGeometry, BufferGeometry, Group, Material, Mesh, MeshStandardMaterial, PlaneGeometry } from "three";
import { CubeThree } from './cube.three';
import { PlaneThree } from './plane.three';
import { TextThree } from './text.three';
import * as THREE from "three";
import { InteractionThree } from "./interaction.three";
import { Card } from "../data/item.model";


export class CardThree extends Group {
  cube: CubeThree = new CubeThree();
  plane: PlaneThree = new PlaneThree(new MeshStandardMaterial({ color: 0x006699 }));
  text = {
    description: new TextThree(),
    name: new TextThree(),
    cost: new TextThree(),
    health: new TextThree(),
    damage: new TextThree(),
  };
  interaction: InteractionThree = new InteractionThree();

  /**
   * Card dimensions
   */
  public static size = {
    /**
     * Width
     */
    x: 1.0,
    /**
     * Height
     */
    y: 297 / 210,
    /**
     * Depth
     */
    z: 0.1
  }

  constructor(card?: Card) {
    super();    

    // Card
    this.cube.scale.set(CardThree.size.x, CardThree.size.y, CardThree.size.z);

    // Interaction
    this.interaction.setSize(this.cube.scale);

    // Picture
    this.plane.scale.set(0.75, 1, 0.6);
    this.plane.position.set(0, 0.2, 0.06);
    this.plane.rotateX(THREE.MathUtils.degToRad(90));

    // Text
    this.text.description.position.set(-0.4, -0.25, 0.07);
    this.text.description.scale.set(0.075, 0.075, 0.01);
    this.text.description.text = "A long description";

    this.text.name.position.set(-0.4, 0.55, 0.07);
    this.text.name.scale.set(0.1, 0.1, 0.01);
    this.text.name.text = "Name";

    this.text.cost.position.set(0.35, 0.55, 0.07);
    this.text.cost.scale.set(0.1, 0.1, 0.01);
    this.text.cost.text = "2";

    this.text.health.position.set(-0.4, -0.65, 0.07);
    this.text.health.scale.set(0.1, 0.1, 0.01);
    this.text.health.text = "3";

    this.text.damage.position.set(0.35, -0.65, 0.07);
    this.text.damage.scale.set(0.1, 0.1, 0.01);
    this.text.damage.text = "4";

    // Group
    this.add(this.text.description);
    this.add(this.text.name);
    this.add(this.text.cost);
    this.add(this.text.health);
    this.add(this.text.damage);
    this.add(this.cube);
    this.add(this.interaction);
    this.add(this.plane);
  }

  loadData(data: Card) {
    this.text.name.text = data.item?.name ?? "";
    this.text.description.text = data.item?.description ?? "";
    this.text.cost.text = String(data.cost) ?? "";
    this.text.health.text = String(data.health) ?? "";
    this.text.damage.text = String(data.damage) ?? "";

    // Create an image
    const image = new Image();
    // Create texture
    var texture = new THREE.Texture(image);
    // On image load, update texture
    image.onload = () =>  { texture.needsUpdate = true };
    // Set image source
    image.src = data.item?.image;

    this.plane.mesh.material = new THREE.MeshBasicMaterial({map: texture});
  }
}
