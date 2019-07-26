import { StatEnum, IPokemon, IMove, IStat, Constants } from "./types";

export class Pokemon implements IPokemon {
  moves: IMove[];
  level: number = 1;
  name: string;
  gender: boolean = true;
  stats: IStat[] = [];
  constructor(name: string, level: number = 1, gender: boolean = true) {
    this.name = name;
    this.gender = gender;
    this.level = level;
  }

  public removeStat(name: StatEnum): void {
    const indexOfStat: number = this.stats.findIndex((stat: IStat) => stat.name === name);
    if (indexOfStat) {
      this.stats.splice(indexOfStat, 1);
    } else {
      throw new Error(`The ${name} stat is not assigned to the Pokemon`);
    }
  }

  private getTotalEVs(): number {
    return this.stats
      .map((stat: IStat) => stat.ev)
      .reduce((prev: number, cur: number) => prev + cur, 0);
  }

  public learn(newMove: IMove): void {}

  public setStat(newStat: IStat): void {
    const hasStat: boolean = this.stats.some((stat: IStat) => stat.name === newStat.name);

    if (hasStat) {
      throw new Error(`The Pokemon already has the ${newStat.name} stat.`);
    }

    if (newStat.ev > Constants.MAX_EV) {
      throw new Error(
        `The total amount of EVs of a single Stat has cannot exceed ${Constants.MAX_EV}`
      );
    }

    if (this.getTotalEVs() + newStat.ev > Constants.MAX_TOTAL_EV) {
      throw new Error(
        `The total amount of EVs a Pokemon has cannot exceed ${Constants.MAX_TOTAL_EV}`
      );
    }

    if (newStat.iv > Constants.MAX_IV) {
      throw new Error(
        `The total amount of IVs of a single Stat has cannot exceed ${Constants.MAX_IV}`
      );
    }

    this.stats.push(newStat);
  }

  public setStats(...stats: IStat[]) {
    stats.forEach((stat: IStat) => {
      this.setStat(stat);
    });
  }

  private getStat(StatEnum: StatEnum): IStat {
    const stat: IStat = this.stats.filter(e => e.name === StatEnum)[0];
    if (!stat) {
      throw new Error(`The ${StatEnum} stat was not assigned to the Pokemon`);
    }
    return stat;
  }

  public getStatLevel(name: StatEnum): number {
    const stat: IStat = this.getStat(name);
    if (!stat) {
      return -1;
    }
    return calculateStatLevel(stat.base, stat.iv, stat.ev, this.level, name === "hp");
  }
}
function calculateStatLevel(
  base: number,
  iv: number,
  ev: number,
  level: number,
  hp: boolean
): number {
  const num: number = (2 * base + iv + ev / 4) * level;
  const den: number = 100;

  let normLevel: number = num / den + 5;

  if (hp) {
    normLevel += level + 5;
  }
  return normLevel;
}
