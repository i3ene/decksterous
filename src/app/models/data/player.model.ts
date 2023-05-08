import { EventEmitter } from "@angular/core";
import { Card } from "./card.model";
import { PlayerThree } from "../three/player.three";

export class Player extends PlayerThree {
  playerIndex: number = 0;

  constructor(obj: any) {
    super(obj);
    this.playerIndex = obj.playerIndex ?? 0;
  }

}

export class PlayerCollection {
  players: Map<number, Player> = new Map();
  selfIndex: number = 0;
  currentIndex: number = 0;

  playerAdded: EventEmitter<number> = new EventEmitter();
  playerUpdated: EventEmitter<number> = new EventEmitter();

  set(key: number, player: Player) {
    this.players.set(key, player);
    if (this.find(player) == -1) this.playerAdded.emit(key);
    else this.playerUpdated.emit(key);
  }

  find(player: Player) {
    for(const [key, entry] of this.players.entries()) {
      if (entry == player) return key;
    }
    return -1;
  }

  self() {
    return this.players.get(this.selfIndex);
  }

  get atTurn(): boolean {
    return this.currentIndex == this.selfIndex;
  }
}