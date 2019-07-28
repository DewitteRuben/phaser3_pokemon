import { Game } from "../../classes/Game";
import { Battle } from "../../scenes/Battle";

export let instance: Game = null;
export let mainScene: Phaser.Scene = null;

export const init = (game: Game) => {
  instance = game;
  game.scene.add("Battle", Battle);
};

export const getInstance = () => {
  return instance;
};

export const getScene = () => {
  return mainScene;
};
