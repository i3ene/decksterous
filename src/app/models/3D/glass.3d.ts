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
    this.object.castShadow = true;

    this.setMaterial3(this.object);

    this.add(this.object);
  }

  setMaterial1(object: THREE.Object3D & Mesh) {
    if(!Array.isArray(object.material)) {
      object.material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        vertexColors: true,
        transparent: true,
        side: THREE.DoubleSide
      });
    }
    GeometryHelper.linearGradient(object, new THREE.Color(0.8, 0.8, 1), new THREE.Color(0.5, 0.5, 1));
    GeometryHelper.opacityGradient(object, 0.25, 0.9);
  }

  setMaterial2(object: THREE.Object3D & Mesh) {
    if(!Array.isArray(object.material)) {
      object.material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        vertexColors: true,
        transparent: true,
        side: THREE.DoubleSide
      });
    }
    GeometryHelper.linearGradient(object, new THREE.Color(0.8, 0.8, 1), new THREE.Color(0.5, 0.5, 1));
    GeometryHelper.opacityGradient(object, 0.25, 0.9);
  }

  setMaterial3(object: THREE.Object3D & Mesh) {
    if(!Array.isArray(object.material)) {
      object.material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        vertexColors: true,
        transparent: true,
        side: THREE.DoubleSide,
        transmission: 0.5,
        roughness: 0.05,
        reflectivity: 1,
        thickness: 0.5,
        flatShading: false
      } as any);
    }
    GeometryHelper.linearGradient(object, new THREE.Color(0.8, 0.8, 1), new THREE.Color(0.5, 0.5, 1));
  }

  loadProgress(event: any) {
    console.log(event);
  }
}
