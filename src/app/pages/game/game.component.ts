import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { GameScene } from 'src/app/logic/scenes/game.scene';
import { TestScene } from 'src/app/logic/scenes/test.scene';
import { ThreeLogic } from 'src/app/logic/three.logic';
import { GameService } from 'src/app/services/game.service';
import { SocketConnection } from 'src/app/services/request/socket.connection';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GamePage implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef;

  threeLogic!: ThreeLogic;

  constructor(private game: GameService) {}

  ngAfterViewInit(): void {
    this.threeLogic = new ThreeLogic(this.canvasRef);
    this.threeLogic.loadScene(new TestScene());
    this.threeLogic.loadScene(new GameScene(this.game));
  }

}
