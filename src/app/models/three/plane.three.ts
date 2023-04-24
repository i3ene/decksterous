import * as THREE from "three";
import { BoxGeometry, BufferGeometry, Material, Mesh, MeshStandardMaterial, PlaneGeometry } from "three";

export class PlaneThree extends THREE.Group {
  geometry: BufferGeometry = new PlaneGeometry(1, 1, 1);
  material: Material = new MeshStandardMaterial({ color: 0xFFFFFF });
  mesh: Mesh;

  constructor(material?: Material) {
    super();
    if (material) this.material = material;
    this.mesh = new Mesh(this.geometry, this.material);

    this.mesh.receiveShadow = true;

    this.mesh.rotateX(THREE.MathUtils.degToRad(-90));

    this.add(this.mesh);
  }

}
