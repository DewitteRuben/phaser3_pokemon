import { IStat, StatEnum } from "./types";

export class Stat implements IStat {
  iv: number;
  ev: number;
  base: number;
  name: StatEnum;
  constructor(name: StatEnum, base: number, iv: number, ev: number) {
    this.name = name;
    this.base = base;
    this.iv = iv;
    this.ev = ev;
  }
}