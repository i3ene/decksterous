import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { TestScene } from 'src/app/logic/scenes/test.scene';
import { ThreeLogic } from 'src/app/logic/three.logic';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef;

  threeLogic!: ThreeLogic;

  ngAfterViewInit(): void {
    this.threeLogic = new ThreeLogic(this.canvasRef);
    this.threeLogic.registerScene(new TestScene());
  }
  
}
