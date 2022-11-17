export class Game {
  player1!: any;
  player2!: any;

  cardsOnField!: any[];
  ruleSet!: any;

  constructor() {}

  beforeGameStart(): void {}

  atGameStart(): void {}

  afterGameStart(): void {}

  beforeTurn(): void {}

  atTurn(): void {}

  afterTurn(): void {}

  beforeGameEnd(): void {}

  atGameEnd(): void {}

  afterGameEnd(): void {}
}