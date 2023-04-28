import { BoxGeometry, BufferGeometry, Group, Material, Mesh, MeshStandardMaterial, PlaneGeometry } from "three";
import { CubeThree } from './cube.three';
import { PlaneThree } from './plane.three';
import { TextThree } from './text.three';
import * as THREE from "three";
import { Card } from "../data/card.model";


export class CardThree extends Group {
  cube: CubeThree = new CubeThree();
  plane: PlaneThree = new PlaneThree(new MeshStandardMaterial({ color: 0x006699 }));
  text: TextThree = new TextThree();

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

    // Listen for selection
    this.cube.mesh.selectable = true;
    this.cube.mesh.selecting.subscribe((x: any) => console.log(`Selection (${x})`));

    // Listen for click
    this.cube.mesh.clickable = true;
    this.cube.mesh.clicking.subscribe((x: any) => console.log(`Clicked (${x})`));
    

    /** 3D model **/

    // Card
    this.cube.scale.set(CardThree.size.x, CardThree.size.y, CardThree.size.z);

    // Picture
    this.plane.scale.set(0.75, 1, 0.6);
    this.plane.position.set(0, 0.25, 0.06);
    this.plane.rotateX(THREE.MathUtils.degToRad(90));

    // Text
    this.text.text = "Some Text!";
    this.text.position.set(-0.4, -0.2, 0.07);
    this.text.scale.set(0.1, 0.1, 0.01);

    setTimeout(() => this.text.text += "\nAnother Text!", 3000);

    // Group
    this.add(this.text);
    this.add(this.cube);
    this.add(this.plane);
  }
}
