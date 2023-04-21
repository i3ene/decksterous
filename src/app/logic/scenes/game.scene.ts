import { IScene } from "src/app/models/object/scene.model";
import { ThreeLogic } from "../three.logic";
import { CubeThree } from "src/app/models/three/cube.three";
import { Group, Mesh, Vector3 } from "three";
import { CardObject } from "src/app/models/three/card.three";
import { DeckThree } from "src/app/models/three/deck.three";
import { GameService } from "src/app/services/game.service";
import { SocketKey } from "src/app/models/object/service.model";
import { Subscription } from "rxjs";

export class GameScene implements IScene {
  functions = {
    logger: this.logger.bind(this)
  };

  deck: DeckThree = new DeckThree();

  gameSubscription?: Subscription;

  constructor(private game: GameService) {
    this.deck.position.y = 2;
    this.deck.addCard(new CardObject());
    this.deck.addCard(new CardObject());
    this.deck.addCard(new CardObject());
    this.deck.addCard(new CardObject());
    this.deck.addCard(new CardObject());
    this.deck.addCard(new CardObject());
  }

  handleGameEvent(event: any) {
    console.log(event);
  }

  bind(threeLogic: ThreeLogic) {
    this.gameSubscription = this.game.socket.observables.get(SocketKey.GAME)?.subscribe(x => this.handleGameEvent(x));
    threeLogic.loadObject(this, this.deck);
    //setTimeout(() => threeLogic.unloadScene(this), 5000);
  }

  unbind(threeLogic: ThreeLogic) {
    this.gameSubscription?.unsubscribe();
  }

  logger(threeLogic: ThreeLogic) {
    //console.log("Active");
  }
}
