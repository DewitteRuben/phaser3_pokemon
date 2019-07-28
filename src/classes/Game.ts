import { Overworld } from "../scenes/Overworld";

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

// main game configuration
export const gameConfig: Phaser.Types.Core.GameConfig = {
  width: 320,
  height: 240,
  type: Phaser.AUTO,
  parent: "game",
  scene: Overworld,
  scale: {
    mode: Phaser.Scale.NONE,
    zoom: 3
  },
  render: {
    roundPixels: true,
    antialias: false,
    pixelArt: true
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }
  }
};
