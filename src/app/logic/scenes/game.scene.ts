import { IScene } from "src/app/models/object/scene.model";
import { SocketConnection } from "src/app/services/request/socket.connection";
import { ThreeLogic } from "../three.logic";
import { CubeThree } from "src/app/models/three/cube.three";
import { Group, Mesh, Vector3 } from "three";
import { CardObject } from "src/app/models/three/card.three";
import { DeckThree } from "src/app/models/three/deck.three";

export class GameScene implements IScene {
  functions = {
    logger: this.logger.bind(this)
  };

  deck: DeckThree = new DeckThree();

  constructor(private socket: SocketConnection) {
    this.deck.position.y = 2;
    this.deck.addCard(new CardObject());
    this.deck.addCard(new CardObject());
    this.deck.addCard(new CardObject());
    this.deck.addCard(new CardObject());
    this.deck.addCard(new CardObject());
    this.deck.addCard(new CardObject());
  }

  bind(threeLogic: ThreeLogic) {
    threeLogic.loadObject(this, this.deck);
    //setTimeout(() => threeLogic.unloadScene(this), 5000);
  }

  logger(threeLogic: ThreeLogic) {
    console.log("Active");
  }
}
