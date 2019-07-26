export interface IPokemon {
  name: string;
  gender: boolean;
  level: number;
  stats: IStat[];
  moves: IMove[];
}

export interface IStat {
  iv: number;
  ev: number;
  base: number;
  name: StatEnum;
}

export interface IMove {
  name: string;
  accuracy: number;
  pp: number;
  power: number;
  class: MoveClass;
}

export enum MoveClass {
  SPECIAL,
  PHYSICAL
}

export enum StatEnum {
  HP = "hp",
  ATTACK = "attack",
  DEFENSE = "defense",
  SPATK = "spatk",
  SPDEF = "spdef",
  SPEED = "speed"
}

export const Constants = {
  MAX_IV: 31,
  MAX_EV: 252,
  MAX_TOTAL_EV: 508
};