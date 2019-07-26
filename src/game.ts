/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

import "phaser";
import { Overworld } from "./scenes/Overworld";

// main game configuration
const config: Phaser.Types.Core.GameConfig = {
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

// game class
export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
  var game = new Game(config);
});
