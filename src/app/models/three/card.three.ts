import { BoxGeometry, BufferGeometry, Group, Material, Mesh, MeshStandardMaterial, PlaneGeometry } from "three";
import { CubeThree } from './cube.three';
import { PlaneThree } from './plane.three';
import { TextThree } from './text.three';
import * as THREE from "three";


export class CardObject extends Group {
  cube: CubeThree = new CubeThree();
  plane: PlaneThree = new PlaneThree(new MeshStandardMaterial({ color: 0x006699 }));
  text: TextThree = new TextThree();

  constructor() {
    super();

    this.cube.scale.set(1, 297 / 210, 0.1);

    this.plane.scale.set(0.75, 1, 0.6);
    this.plane.position.set(0, 0.25, 0.06);
    this.plane.rotateX(THREE.MathUtils.degToRad(90));

    this.text.text = "Some Text!";
    this.text.position.set(-0.4, -0.2, 0.07);
    this.text.scale.set(0.1, 0.1, 0.01);

    setTimeout(() => this.text.text += "\nAnother Text!", 3000);

    this.add(this.text);
    this.add(this.cube);
    this.add(this.plane);
  }
}
