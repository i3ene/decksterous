import { IScene } from "src/app/models/object/scene.model";
import { ThreeLogic } from "../three.logic";
import { Table3D } from "src/app/models/3D/table.3d";
import { Glass3D } from "src/app/models/3D/glass.3d";
import { DirectionalLight, HemisphereLight } from "three";
import * as THREE from "three";
import { PlaneThree } from "src/app/models/three/plane.three";

export class TableScene implements IScene {
  ambient: HemisphereLight = new HemisphereLight(0x95ddff, 0x498f8c, 1);
  light: THREE.SpotLight = new THREE.SpotLight(0xfaefd4, 0.8);

  table: Table3D = new Table3D();
  glass: Glass3D = new Glass3D();
  wall = {
    bottom: new PlaneThree(new THREE.MeshStandardMaterial({ color: 0x555555 })),
    left: new PlaneThree(new THREE.MeshStandardMaterial({ color: 0x555555 })),
    right: new PlaneThree(new THREE.MeshStandardMaterial({ color: 0x555555 })),
    top: new PlaneThree(new THREE.MeshStandardMaterial({ color: 0x555555 })),
    front: new PlaneThree(new THREE.MeshStandardMaterial({ color: 0x555555 })),
  };

  constructor() {
    this.ambient.position.set(0, 10, 0);

    this.light.position.set(0, 10, 0);
    this.light.castShadow = true;
    this.light.shadow.mapSize = new THREE.Vector2(4096, 4096);
    // const d: number = 50;
    // this.light.shadow.camera.left = -d;
    // this.light.shadow.camera.right = d;
    // this.light.shadow.camera.top = d;
    // this.light.shadow.camera.bottom = -d;

    this.table.scale.set(2, 2, 2);

    this.glass.scale.set(0.75, 0.75, 0.75);
    this.glass.position.set(5, 0.9, 2);

    this.wall.bottom.scale.set(40, 1, 40);
    this.wall.bottom.position.set(0, -8.5, 0);

    this.wall.top.scale.set(40, 1, 40);
    this.wall.top.position.set(0, 15, 0);
    this.wall.top.rotation.x = THREE.MathUtils.degToRad(180);

    this.wall.front.scale.set(40, 1, 40);
    this.wall.front.position.set(0, 8.5, -20);
    this.wall.front.rotation.x = THREE.MathUtils.degToRad(90);

    this.wall.left.scale.set(40, 1, 40);
    this.wall.left.position.set(-20, 8.5, 0);
    this.wall.left.rotation.z = THREE.MathUtils.degToRad(-90);

    this.wall.right.scale.set(40, 1, 40);
    this.wall.right.position.set(20, 8.5, 0);
    this.wall.right.rotation.z = THREE.MathUtils.degToRad(90);
  }

  bind(threeLogic: ThreeLogic) {
    threeLogic.loadObject(this, this.ambient, this.light, this.table, this.glass, this.wall.bottom, this.wall.left, this.wall.right, this.wall.front, this.wall.top);
    this.camerSetup(threeLogic.camera);
  }

  camerSetup(camera: THREE.Camera) {
    camera.position.set(0, 6, 12);
    camera.rotateX(THREE.MathUtils.degToRad(-30));
  }
}