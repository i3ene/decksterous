import { ThreeLogic } from '../logic/three.logic';

export interface IScene {
  bind: (threeLogic: ThreeLogic) => void;
}
