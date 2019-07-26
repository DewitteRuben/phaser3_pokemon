import { IMove, MoveClass, TypeEnum, Constants } from "./types";

export class Move implements IMove {
  name: string;
  accuracy: number;
  pp: number;
  power: number;
  damageClass: MoveClass;
  type: TypeEnum;

  constructor(
    name: string,
    accuracy: number,
    pp: number,
    power: number,
    damageClass: MoveClass,
    type: TypeEnum
  ) {
    if (accuracy > Constants.MAX_ACCURACY) {
      throw new Error("Accuracy cannot exceed 100%");
    }

    this.name = name;
    this.accuracy = accuracy;
    this.pp = pp;
    this.power = power;
    this.damageClass = damageClass;
    this.type = type;
  }
}
