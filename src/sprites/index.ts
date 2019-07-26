import { SpriteSheet } from "../classes/SpriteSheet";
import { Sprite } from "../classes/Sprite";

export enum PLAYER_SPRITE_FRAME {
  LEFT = 1,
  DOWN = 3,
  UP = 6,
  RIGHT = 9
}

// spritesheets
export const playerSheet: SpriteSheet = new SpriteSheet(
  "player",
  "src/assets/characters/red.png",
  true,
  {
    frameHeight: 16,
    frameWidth: 16
  }
);

// sprites
export const dialogBoxSprite: Sprite = new Sprite(
  "dialogBox",
  "src/assets/misc/dialog_box.png",
  false
);
export const pokeballSprite: Sprite = new Sprite(
  "ow_pokeball",
  "src/assets/overworld/pokeball.png",
  true
);
export const viewSprite: Sprite = new Sprite("viewSprite", "src/assets/misc/view.png", true);
export const menuSprite: Sprite = new Sprite("menu", "src/assets/misc/menu.png", false);
