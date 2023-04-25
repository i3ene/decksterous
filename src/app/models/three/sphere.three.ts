import * as THREE from "three";
import { BufferGeometry, Group, Material, Mesh, MeshStandardMaterial, SphereGeometry, Vector2, Vector3 } from "three";
import { GeometryHelper } from "../helper/geometry";

export class SphereThree extends Group {

  geometry: BufferGeometry = new SphereGeometry(1, 10, 5);
  material: Material = new MeshStandardMaterial({ color: 0xFFFFFF, vertexColors: true });
  mesh: Mesh;

  constructor(material?: Material) {
    super();
    if (material) this.material = material;
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;

    GeometryHelper.setColor(this.mesh, new THREE.Color(1, 1, 1), new THREE.Color(0.2, 0.2, 1));

    this.add(this.mesh);
  }

}
