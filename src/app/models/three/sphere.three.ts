import * as THREE from "three";
import { BufferGeometry, Group, Material, Mesh, MeshStandardMaterial, SphereGeometry, Vector2, Vector3 } from "three";

export class SphereThree extends Group {

  geometry: BufferGeometry = new SphereGeometry(1, 20, 10);
  material: Material = new MeshStandardMaterial({ color: 0xFFFFFF });
  mesh: Mesh;

  constructor(material?: Material) {
    super();
    if (material) this.material = material;
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;

    this.add(this.mesh);
  }

}
