/* Interfaces */

export interface IAbility {
  key: string;
  name: string;
  description?: string;
}

export interface IType {
  id: number;
  type: string;
  description?: string;
}

/* Abstracts */

export abstract class AAbility implements IAbility {
  key: string;
  name: string;
  description?: string;

  constructor(obj?: any) {
    this.key = obj?.key ?? '';
    this.name = obj?.name ?? '';
    this.description = obj?.description ?? '';
  }
}

export abstract class AType implements IType {
  id: number;
  type: string;
  description?: string;
  
  constructor(obj?: any) {
    this.id = Number(obj?.id ?? 0);
    this.type = obj?.type ?? '';
    this.description = obj?.description ?? '';
  }
}

/* Classes */

export class Ability extends AAbility {
  constructor(obj?: any) {
    super(obj);
  }
}

export class Type extends AType {
  constructor(obj?: any) {
    super(obj);
  }
}