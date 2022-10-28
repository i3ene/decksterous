import * as THREE from "three";
import { BoxGeometry, BufferGeometry, Material, Mesh, MeshStandardMaterial, PlaneGeometry } from "three";

export class PlaneThree {
  geometry: BufferGeometry = new PlaneGeometry(10, 10, 1);
  material: Material = new MeshStandardMaterial({ color: 0xFFFFFF });
  mesh: Mesh;

  constructor(material?: Material) {
    if (material) this.material = material;
    this.mesh = new Mesh(this.geometry, this.material);

    this.mesh.receiveShadow = true;

    this.mesh.rotateX(THREE.MathUtils.degToRad(-90));
  }

}