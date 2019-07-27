import {
  IBattleField,
  IMove,
  MoveClass,
  StatEnum,
  typeEffectivenessTable,
  types,
  TypeEnum
} from "./types";
import { Pokemon } from "./Pokemon";

export class BattleField implements IBattleField {
  ally: Pokemon;
  axis: Pokemon;

  constructor(ally: Pokemon, axis: Pokemon) {
    this.ally = ally;
    this.axis = axis;
  }

  public allyAttack(move: IMove) {
    const damage = this.calculateDamage(move, this.ally, this.axis);
    this.axis.updateCurrentHp(Math.floor(damage));
    return damage;
  }

  public axisAttack() {
    const damage = this.calculateDamage(this.AIPickMove(), this.axis, this.ally);
    this.ally.updateCurrentHp(Math.floor(damage));
    return damage;
  }

  // temp solution since only have one move just use that one
  private AIPickMove() {
    return this.axis.moves[0];
  }

  private getADModifier(pokemon: Pokemon, move: IMove) {
    return move.damageClass === MoveClass.PHYSICAL
      ? pokemon.getStatLevel(StatEnum.ATTACK)
      : pokemon.getStatLevel(StatEnum.SPATK);
  }

  private calculateDamageModifier(move: IMove, off: Pokemon, def: Pokemon) {
    // Targets * Weather * Badge * Crit * Random * STAB * type * burn * other
    // Critical * random * STAB * Type <-- currently using

    const critChance = off.getBaseStatLevel(StatEnum.SPEED) / 512;
    const isCrit = critChance > Math.random();
    const critMod = isCrit ? 2 : 1;

    const randomMod = parseFloat((Math.random() * (1 - 0.85) + 0.85).toFixed(2));
    const typeMod = this.calculateTypeModifier(move, def);
    const stabMod = off.hasType(move.type) ? 1.5 : 1;

    return critMod * randomMod * typeMod * stabMod;
  }

  private calculateTypeModifier(move: IMove, def: Pokemon): number {
    const effectivenessArray = typeEffectivenessTable[types.indexOf(move.type)];
    return def.types.reduce((previousValue: number, currentValue: TypeEnum) => {
      return previousValue * effectivenessArray[types.indexOf(currentValue)];
    }, 1);
  }

  private calculateDamage(move: IMove, off: Pokemon, def: Pokemon) {
    const offAttack = this.getADModifier(off, move);
    const defDefense = this.getADModifier(def, move);

    const numerator = ((2 * (off.level / 5) + 2) * move.power * offAttack) / defDefense;
    const denominator = 50;
    const modifier = this.calculateDamageModifier(move, off, def);
    
    return (numerator / denominator + 2) * modifier;
  }
}
