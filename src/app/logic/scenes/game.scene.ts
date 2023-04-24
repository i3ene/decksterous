import { IScene } from "src/app/models/object/scene.model";
import { ThreeLogic } from "../three.logic";
import { CubeThree } from "src/app/models/three/cube.three";
import { Group, Mesh, Vector3 } from "three";
import { CardThree } from "src/app/models/three/card.three";
import { DeckThree } from "src/app/models/three/deck.three";
import { GameService } from "src/app/services/game.service";
import { SocketKey } from "src/app/models/object/service.model";
import { Subscription } from "rxjs";
import { HandThree } from "src/app/models/three/hand.three";
import { FieldThree } from "src/app/models/three/field.three";
import { PlayerThree } from "src/app/models/three/player.three";
import * as THREE from "three";

export class GameScene implements IScene {
  functions = {
    logger: this.logger.bind(this)
  };

  players: PlayerThree[] = [];

  allEvent?: Subscription;
  playerEvent?: Subscription;

  constructor(private game: GameService) {
    this.players[0] = new PlayerThree(5);
    this.players[1] = new PlayerThree(5);

    this.players[1].position.z = -3;
    this.players[1].rotation.y = THREE.MathUtils.degToRad(180);
  }

  handleEvent(event: any) {
    console.log(event);
  }

  bind(threeLogic: ThreeLogic) {
    this.allEvent = this.game.all.subscribe(this.handleEvent.bind(this));
    this.playerEvent = this.game.player.subscribe(this.handleEvent.bind(this));

    threeLogic.loadObject(this, ...this.players);
    //setTimeout(() => threeLogic.unloadScene(this), 5000);
  }

  unbind(threeLogic: ThreeLogic) {
    this.allEvent?.unsubscribe();
    this.playerEvent?.unsubscribe();
  }

  logger(threeLogic: ThreeLogic) {
    //console.log("Active");
  }
}
