import { PokemonFactory } from "../classes/PokemonFactory";

export enum Area {
  HOME = "home",
  ROUTE_1 = "route_1"
}

export const wildEncounters = {
  [Area.HOME]: ["bulbasaur"]
};

export const getRandomEncounter = () => {
  // temp area home
  const possibleEncounters = wildEncounters[Area.HOME];
  const randomEncounter = possibleEncounters[Math.floor(Math.random() * possibleEncounters.length)];
  return PokemonFactory.create(randomEncounter, 100);
};
