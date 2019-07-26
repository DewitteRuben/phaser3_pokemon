import * as moves from "../data/moves.json";
import { Move } from "./Move.js";
import { MoveClass, TypeEnum } from "./types.js";

export class MoveFactory {
  public static create(name: string) {
    const moveObj = this.fetchMoveData(name);
    return new Move(
      name,
      moveObj.accuracy,
      moveObj.pp,
      moveObj.power,
      MoveClass[moveObj.class],
      TypeEnum[moveObj.type]
    );
  }

  private static fetchMoveData(name: string) {
    const moveObj = moves.filter(move => move.name === name)[0];

    if (moveObj === undefined) {
      throw new Error(`Unable to find move with name ${name}.`);
    }
    return moveObj;
  }
}
