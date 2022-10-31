import { CubeThree } from 'src/app/models/cube.three';
import { PlaneThree } from 'src/app/models/plane.three';
import { IScene } from 'src/app/models/scene.model';
import * as THREE from 'three';
import { Camera, DirectionalLight, HemisphereLight, Mesh, Vector3 } from 'three';
import { ThreeLogic } from '../three.logic';
import * as TWEEN from '@tweenjs/tween.js';

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
    threeLogic.loopFunctions.push(this.cubeRotation.bind(this));
    threeLogic.loopFunctions.push(this.cubeCircle.bind(this));
    //this.cubeMove(threeLogic);
  }

  cubeRotation(threeLogic: ThreeLogic) {
    this.cube.rotation.x += 0.003;
    this.cube.rotation.y += 0.007;
    this.cube.rotation.z += 0.001;
  }

  cubeCircle(threeLogic: ThreeLogic) {
    this.cube.position.x = Math.sin(threeLogic.time.current * 0.002) * 2;
    this.cube.position.y = Math.sin(threeLogic.time.current * 0.001) * 1 + 2;
    this.cube.position.z = Math.cos(threeLogic.time.current * 0.001) * 2;
  }

  cubeMove(threeLogic: ThreeLogic) {
    var move1 = threeLogic.move(this.cube, new Vector3(1, 1, 0), 20).easing(TWEEN.Easing.Cubic.Out);
    var move2 = threeLogic.move(this.cube, new Vector3(0, -2, -1), 40).easing(TWEEN.Easing.Cubic.Out);
    var move3 = threeLogic.move(this.cube, new Vector3(-2, 0, 2), 40).easing(TWEEN.Easing.Cubic.Out);
    var move4 = threeLogic.move(this.cube, new Vector3(1, 1, -1), 20).easing(TWEEN.Easing.Cubic.Out);

    move1.chain(move2);
    move2.chain(move3);
    move3.chain(move4);
    move4.chain(move1);

    move1.start();
  }
}
