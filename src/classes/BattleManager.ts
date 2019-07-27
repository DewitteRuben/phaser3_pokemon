import { BattleField } from "./BattleField";
import { Player } from "./Player";
import { IMove } from "./types";

enum STATE {
  IDLE = "idle",

  ATTACKING = "attacking",
  DEFENDING = "defending",

  ALLY_FAINT = "ally_faint",
  AXIS_FAINT = "axis_faint",

  ALLY_SWITCH_POKEMON = "ally_switch_pokemon",
  AXIS_SWITCH_POKEMON = "axis_switch_pokemon",

  VICTORY = "victory",
  WIPEOUT = "wipeout"
}

export class BattleManager {
  battleField: BattleField;
  selectedMove: IMove;
  state: STATE = STATE.IDLE;

  constructor(battleField: BattleField) {
    this.battleField = battleField;
  }

  update() {
    console.log("allie", this.battleField.ally.currentHP, "axis", this.battleField.axis.currentHP);

    if (this.state === STATE.ATTACKING) {
      // playing is now attacking
      // write text about attacking

      // actual attack
      this.battleField.allyAttack(this.selectedMove);

      // check if pokemon fainted
      if (this.battleField.axis.fainted) {
        this.state = STATE.VICTORY;
      }

      this.state = STATE.DEFENDING;
    }

    if (this.state === STATE.DEFENDING) {
      // playing is now attacking
      // write text about attacking

      // actual attack
      this.battleField.axisAttack();

      // check if pokemon fainted
      if (this.battleField.ally.fainted) {
        this.state = STATE.WIPEOUT;
      }

      this.state = STATE.IDLE;
    }
  }

  attack(move: IMove) {
    this.selectedMove = move;
    this.state = STATE.ATTACKING;
  }
}
