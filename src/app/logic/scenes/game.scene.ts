import { IScene } from "src/app/models/object/scene.model";
import { SocketConnection } from "src/app/services/request/socket.connection";
import { ThreeLogic } from "../three.logic";
import { CubeThree } from "src/app/models/three/cube.three";
import { Group, Mesh, Vector3 } from "three";
import { CardObject } from "src/app/models/three/card.three";

export class GameScene implements IScene {
  functions = {
    logger: this.logger.bind(this)
  };

  card: CardObject = new CardObject();

  constructor(private socket: SocketConnection) {
    this.card.position.y = 2;
  }

  bind(threeLogic: ThreeLogic) {
    threeLogic.loadObject(this, this.card);
    //setTimeout(() => threeLogic.unloadScene(this), 2000);
  }

  logger(threeLogic: ThreeLogic) {
    console.log("Active");
  }
}
