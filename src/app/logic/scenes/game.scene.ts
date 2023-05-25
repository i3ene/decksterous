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

  allEvent?: Subscription;
  playerEvent?: Subscription;

  constructor(private game: GameService) {
    Array.from(this.game.collection.players.keys()).forEach(this.playerAdded.bind(this));
  }

  playerAdded(id: number) {
    const player = this.game.collection.players.get(id);
    if (!player) return;

    if (this.game.collection.selfIndex != id) {
      player.position.z = -3;
      player.rotation.y = THREE.MathUtils.degToRad(180);
      player.deck.disabled = true;
      player.hand.disabled = true;
    }

    player.position.z += 1.5;
    player.position.y -= 1.75;
  }

  handleEvent(event: any) {
    console.log(event);
  }

  bind(threeLogic: ThreeLogic) {
    this.allEvent = this.game.all.subscribe(this.handleEvent.bind(this));
    this.playerEvent = this.game.player.subscribe(this.handleEvent.bind(this));

    threeLogic.loadObject(this, ...this.game.collection.players.values());
  }

  unbind(threeLogic: ThreeLogic) {
    this.allEvent?.unsubscribe();
    this.playerEvent?.unsubscribe();
  }

  logger(threeLogic: ThreeLogic) {
    //console.log(threeLogic.intersects[0]);
  }
}
