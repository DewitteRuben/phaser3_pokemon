/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

import "phaser";
import { init } from "./services/game";
import { Game, gameConfig } from "./classes/Game";

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
  init(new Game(gameConfig));
});
