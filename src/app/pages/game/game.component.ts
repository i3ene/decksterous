import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ThreeLogic } from 'src/app/logic/three.logic';
import { CubeThree } from 'src/app/models/cube.three';
import { PlaneThree } from 'src/app/models/plane.three';
import * as THREE from 'three';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef;

  threeLogic!: ThreeLogic;

  ngAfterViewInit(): void {
    this.threeLogic = new ThreeLogic(this.canvasRef);
    this.threeLogic.createScene();
    this.threeLogic.startRenderingLoop();

    var ambient = new THREE.HemisphereLight(0x95ddff, 0x498f8c, 1);
    ambient.position.set(0, 10, 0);
    this.threeLogic.scene.add(ambient);

    var light = new THREE.DirectionalLight(0xFFFFFF, 1);
    light.position.set(-5, 10, 7.5);
    light.castShadow = true;
    this.threeLogic.scene.add(light);

    var cube = new CubeThree().mesh;
    cube.position.set(0, 2, 0);
    cube.scale.set(1, 1, 1);
    this.threeLogic.scene.add(cube);

    var plane = new PlaneThree().mesh;
    plane.position.set(0, 0, 0);
    this.threeLogic.scene.add(plane);

    this.threeLogic.camera.position.set(0, 3, 10);
    this.threeLogic.camera.rotateX(THREE.MathUtils.degToRad(-15));

    this.threeLogic.camera.castShadow = true;

    this.threeLogic.renderList.push(() => {
      cube.rotation.x += 0.003;
      cube.rotation.y += 0.007
    });
  }
}
