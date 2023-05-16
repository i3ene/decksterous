import { BoxGeometry, Material, Mesh, MeshStandardMaterial, Object3D, Vector3 } from "three";

export class InteractionThree extends Mesh {

  padding: number = 0.05;

  constructor(vec?: Vector3, padding?: number) {
    super(new BoxGeometry(1, 1, 1), new MeshStandardMaterial({ color: 0xff6600, opacity: 0.3, transparent: true }));

    if (padding) this.padding = padding;
    if (vec) this.setSize(vec);

    this.selectable = true;
    this.clickable = true;
    this.visible = false;
    
    this.selecting.subscribe(x => this.visible = x);
  }

  setSize(vec: Vector3) {
    this.scale.set(vec.x + (this.padding * 2), vec.y + (this.padding * 2), vec.z + (this.padding * 2));
    this.updateMatrix();
  }

}