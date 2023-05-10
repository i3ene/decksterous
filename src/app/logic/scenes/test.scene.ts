import { CubeThree } from 'src/app/models/three/cube.three';
import { PlaneThree } from 'src/app/models/three/plane.three';
import { IScene } from 'src/app/models/object/scene.model';
import * as THREE from 'three';
import { Camera, DirectionalLight, HemisphereLight, Mesh, Vector3 } from 'three';
import { ThreeLogic } from '../three.logic';
import * as TWEEN from '@tweenjs/tween.js';
import { SphereThree } from 'src/app/models/three/sphere.three';
import { CardThree } from 'src/app/models/three/card.three';
import { Glass3D } from 'src/app/models/3D/glass.3d';

export class TestScene implements IScene {
  ambient!: HemisphereLight;
  light!: DirectionalLight;
  cube!: Mesh;
  plane!: Mesh;

  glass!: THREE.Object3D;

  functions = {
    cubeRotation: this.cubeRotation.bind(this),
    cubeCircle: this.cubeCircle.bind(this)
  }

  constructor() {
    this.initLights();
    this.initObjects();
  }

  initLights() {
    this.ambient = new HemisphereLight(0x95ddff, 0x498f8c, 1);
    this.ambient.position.set(0, 10, 0);

    this.light = new DirectionalLight(0xffffff, 1);
    this.light.position.set(-5, 10, 7.5);
    this.light.castShadow = true;
  }

  initObjects() {
    this.cube = new CubeThree().mesh;
    this.cube.position.set(0, 2, 0);
    this.cube.scale.set(1, 1, 1);

    this.plane = new PlaneThree().mesh;
    this.plane.scale.set(10, 10, 1);
    this.plane.position.set(0, 0, 0);

    this.glass = new Glass3D();
    this.glass.position.set(0, 2, 0);
  }

  camerSetup(camera: Camera) {
    camera.position.set(0, 3, 10);
    camera.rotateX(THREE.MathUtils.degToRad(-15));
  }

  bind(threeLogic: ThreeLogic) {
    threeLogic.loadObject(this, this.ambient, this.light, /*this.cube, this.glass,*/ this.plane);
    this.camerSetup(threeLogic.camera);
  }

  cubeRotation(threeLogic: ThreeLogic) {
    this.cube.rotation.x += 0.017;
    this.cube.rotation.y += 0.014;
    this.cube.rotation.z += 0.011;
  }

  cubeCircle(threeLogic: ThreeLogic) {
    this.cube.position.x = Math.sin(threeLogic.time.current * 0.002) * 2;
    this.cube.position.y = Math.sin(threeLogic.time.current * 0.001) * 1 + 2;
    this.cube.position.z = Math.cos(threeLogic.time.current * 0.001) * 2;
  }

}
