import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { GameScene } from 'src/app/logic/scenes/game.scene';
import { TableScene } from 'src/app/logic/scenes/table.scene';
import { TestScene } from 'src/app/logic/scenes/test.scene';
import { ThreeLogic } from 'src/app/logic/three.logic';
import { GameService } from 'src/app/services/game.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GamePage implements AfterViewInit, OnDestroy {
  @ViewChild('canvas') canvasRef!: ElementRef;

  threeLogic!: ThreeLogic;

  constructor(public game: GameService, private settings: SettingsService) {}

  ngAfterViewInit(): void {
    this.threeLogic = new ThreeLogic(this.canvasRef, this.settings);
    this.threeLogic.loadScene(new TableScene());
    this.threeLogic.loadScene(new GameScene(this.game));
  }

  ngOnDestroy(): void {
    this.threeLogic.unloadScenes();
  }

}
