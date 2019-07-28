import { BattleManager } from "../classes/BattleManager";
import { Player } from "../classes/Player";
import { Trainer } from "../classes/Trainer";
import { Area, getRandomEncounter } from "../wildencounters";
import { BattleField } from "../classes/BattleField";

export class Battle extends Phaser.Scene {
  battleManager: BattleManager;
  player: Player;

  constructor() {
    super({ key: "Battle" });
  }

  init(data: { player: Player }) {
    console.log("battle scene started");
    if (data.player === undefined) {
      throw new Error("Player object was not found while starting battle.");
    }
    this.player = data.player;

    const playerPokemon = this.player.pokemon;
    if (playerPokemon.length < 1) {
      throw new Error("Player has no usable pokemon!");
    }

    const battleField = new BattleField();
    battleField.setAlly(playerPokemon[0]);
    battleField.setAxis(getRandomEncounter());

    this.battleManager = new BattleManager(battleField);
  }

  preload() {}

  create() {}

  update() {
    this.battleManager.update();
  }
}
