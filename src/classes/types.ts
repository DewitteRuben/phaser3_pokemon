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
  damageClass: MoveClass;
}

export enum MoveClass {
  SPECIAL = "special",
  PHYSICAL = "physical"
}

export enum TypeEnum {
  NORMAL = "normal",
  FIRE = "fire",
  WATER = "water",
  ELECTRIC = "electric",
  GRASS = "grass",
  ICE = "ice",
  FIGHTING = "fighting",
  POISON = "poison",
  GROUND = "ground",
  FLYING = "flying",
  PSYCHIC = "psychic",
  BUG = "bug",
  ROCK = "rock",
  GHOST = "ghost",
  DRAGON = "dragon"
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
  MAX_TOTAL_EV: 508,
  MAX_MOVES: 4,
  MAX_ACCURACY: 100
};
