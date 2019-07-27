import * as pokemon from "../data/pokemon.json";
import { Stat } from "./Stat.js";
import { StatEnum, TypeEnum } from "./types.js";
import { Pokemon } from "./Pokemon.js";
import { MoveFactory } from "./MoveFactory.js";

export class PokemonFactory {
  static create(name: string, level: number, gender?: boolean) {
    const pokeObj = this.fetchPokemonData(name);
    const pokemon = new Pokemon(name, level, gender);

    const hp = new Stat(StatEnum.HP, pokeObj.stats[StatEnum.HP], 0, 0);
    const att = new Stat(StatEnum.ATTACK, pokeObj.stats[StatEnum.ATTACK], 0, 0);
    const def = new Stat(StatEnum.DEFENSE, pokeObj.stats[StatEnum.DEFENSE], 0, 0);
    const spatk = new Stat(StatEnum.SPATK, pokeObj.stats[StatEnum.SPATK], 0, 0);
    const spdef = new Stat(StatEnum.SPDEF, pokeObj.stats[StatEnum.SPDEF], 0, 0);
    const spd = new Stat(StatEnum.SPEED, pokeObj.stats[StatEnum.SPEED], 0, 0);
    const tackle = MoveFactory.create("tackle");

    const types: TypeEnum[] = pokeObj.type.map(type => TypeEnum[type]);

    pokemon.setStats(hp, att, def, spatk, spdef, spd);
    pokemon.learn(tackle);
    pokemon.setTypes(types);

    return pokemon;
  }

  private static fetchPokemonData(name: string) {
    const pokemonObj = pokemon.filter(pokemon => pokemon.name === name)[0];
    if (pokemonObj === undefined) {
      throw new Error(`Pokemon with the name ${name} was not found.`);
    }
    return pokemonObj;
  }
}
