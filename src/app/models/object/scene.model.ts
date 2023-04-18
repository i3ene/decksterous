import { Object3D } from 'three';
import { ThreeLogic } from '../../logic/three.logic';

export interface IScene {
  functions?: { [key: string]: { (threeLogic: ThreeLogic): void } };
  bind?: (threeLogic: ThreeLogic) => void;
  unbind?: (threeLogic: ThreeLogic) => void;
}
