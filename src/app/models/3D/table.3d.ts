import * as THREE from "three";
import { Group, Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GeometryHelper } from "../helper/geometry";

export class Table3D extends Group {
  // Instantiate a loader
  loader = new GLTFLoader();

  object?: THREE.Object3D & Mesh;

  constructor() {
    super();

    this.loadObject();
  }

  async loadObject() {
    this.object = (await this.loader.loadAsync('assets/models/table.gltf', this.loadProgress.bind(this))).scene.children[0] as any;
    if(!this.object) return;
    this.object.castShadow = true;
    this.object.receiveShadow = true;

    this.setMaterial(this.object);

    this.add(this.object);
  }

  setMaterial(object: THREE.Object3D & Mesh) {
    if(!Array.isArray(object.material)) {
      object.material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        vertexColors: true,
        flatShading: true
      });
    }
    GeometryHelper.linearGradient(object, new THREE.Color(0.28, 0.13, 0.01), new THREE.Color(0.06, 0.03, 0), 'z');
  }

  loadProgress(event: any) {
    console.log(event);
  }
}