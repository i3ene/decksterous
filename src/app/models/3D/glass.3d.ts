import * as THREE from 'three';
import { BufferGeometry, Group, Material, Mesh, MeshStandardMaterial, CylinderGeometry, Vector2, Vector3 } from 'three';
import { GeometryHelper } from '../helper/geometry';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as  BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils';

export class Glass3D extends Group {
  // Instantiate a loader
  loader = new GLTFLoader();

  object?: THREE.Object3D & Mesh;

  constructor() {
    super();

    this.loadObject();
  }

  async loadObject() {
    this.object = (await this.loader.loadAsync('assets/models/glass.gltf', this.loadProgress.bind(this))).scene.children[0] as any;
    if(!this.object) return;

    // Material setup
    this.object.castShadow = true;
    if(!Array.isArray(this.object.material)) {
      this.object.material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        vertexColors: true,
        transparent: true,
        side: THREE.DoubleSide,
      });

      console.log(this.object.geometry.getIndex());
    }

    // Vertices gradient
    var max = this.object.geometry.boundingBox?.max.y ?? 0;
    var min = this.object.geometry.boundingBox?.min.y ?? 0;
    GeometryHelper.linearGradient(this.object, new THREE.Color(0.8, 0.8, 1), new THREE.Color(0.5, 0.5, 1), min, max);
    GeometryHelper.opacityGradient(this.object, 0.25, 0.9, min, max);

    this.add(this.object);
  }

  loadProgress(event: any) {
    console.log(event);
  }
}
