import * as THREE from "three";
import { BufferGeometry, Group, Material, Mesh, MeshStandardMaterial, SphereGeometry, Vector2, Vector3 } from "three";
import { GeometryHelper } from "../helper/geometry";
import { CustomShader } from "./shaders/shader.materials";

export class SphereThree extends Group {

  geometry: BufferGeometry = new SphereGeometry(1, 20, 10);
  material: Material = new MeshStandardMaterial({ color: 0xFFFFFF, vertexColors: true });
  mesh: Mesh;

  constructor(material?: Material) {
    super();
    if (material) this.material = material;
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.castShadow = true;

    GeometryHelper.fadeColor(this.mesh, new THREE.Color(1, 0.1, 0.1), new THREE.Color(0.2, 0.2, 1), -1, 1);

    this.add(this.mesh);
  }

}
