import { CubeThree } from 'src/app/models/cube.three';
import { PlaneThree } from 'src/app/models/plane.three';
import { IScene } from 'src/app/models/scene.model';
import * as THREE from 'three';
import { Camera, DirectionalLight, HemisphereLight, Mesh } from 'three';
import { ThreeLogic } from '../three.logic';

export class TestScene implements IScene {
  ambient!: HemisphereLight;
  light!: DirectionalLight;
  cube!: Mesh;
  plane!: Mesh;

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
    this.plane.position.set(0, 0, 0);
  }

  camerSetup(camera: Camera) {
    camera.position.set(0, 3, 10);
    camera.rotateX(THREE.MathUtils.degToRad(-15));
  }

  bind(threeLogic: ThreeLogic) {
    threeLogic.scene.add(this.ambient);
    threeLogic.scene.add(this.light);
    threeLogic.scene.add(this.cube);
    threeLogic.scene.add(this.plane);
    this.camerSetup(threeLogic.camera);
    threeLogic.renderList.push(this.cubeAnimation.bind(this));
  }

  cubeAnimation() {
    this.cube.rotation.x += 0.003;
    this.cube.rotation.y += 0.007;
  }
}
