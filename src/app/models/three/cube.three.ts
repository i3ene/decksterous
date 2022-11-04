import * as THREE from "three";
import { BoxGeometry, BufferGeometry, Material, Mesh, MeshStandardMaterial } from "three";

export class CubeThree {
  geometry: BufferGeometry = new BoxGeometry(1, 1, 1);
  material: Material = new MeshStandardMaterial({ color: 0xFFFFFF });
  mesh: Mesh;

  constructor(material?: Material) {
    if (material) this.material = material;
    this.mesh = new Mesh(this.geometry, this.material);

    this.mesh.castShadow = true;
  }

}