import { SpriteSheet } from "../classes/SpriteSheet";
import { playerSheet } from "../sprites";

interface AnimationConfig {
  framesConfig: Phaser.Types.Animations.GenerateFrameNumbers;
  framerate: number;
  repeat: number;
}

export const ANIM_KEY = {
  PLAYER_LEFT: "player-left",
  PLAYER_RIGHT: "player-right",
  PLAYER_UP: "player-up",
  PLAYER_DOWN: "player-down"
};

export class Animation {
  private key: string;
  private animationConfig: AnimationConfig;
  private spriteSheet: SpriteSheet;

  constructor(key: string, animationConfig: AnimationConfig, spriteSheet: SpriteSheet) {
    this.key = key;
    this.animationConfig = animationConfig;
    this.spriteSheet = spriteSheet;
  }

  load(scene: Phaser.Scene): void {
    scene.anims.create({
      key: this.key,
      frames: scene.anims.generateFrameNumbers(
        this.spriteSheet.key,
        this.animationConfig.framesConfig
      ),
      frameRate: this.animationConfig.framerate,
      repeat: this.animationConfig.repeat
    });
  }
}

export const playerLeft = new Animation(
  ANIM_KEY.PLAYER_LEFT,
  { framerate: 6, framesConfig: { start: 0, end: 1 }, repeat: -1 },
  playerSheet
);
export const playerRight = new Animation(
  ANIM_KEY.PLAYER_RIGHT,
  { framerate: 6, framesConfig: { start: 8, end: 9 }, repeat: -1 },
  playerSheet
);

export const playerUp = new Animation(
  ANIM_KEY.PLAYER_UP,
  { framerate: 6, framesConfig: { frames: [2, 3, 4, 3] }, repeat: -1 },
  playerSheet
);

export const playerDown = new Animation(
  ANIM_KEY.PLAYER_DOWN,
  { framerate: 6, framesConfig: { frames: [5, 6, 7, 6] }, repeat: -1 },
  playerSheet
);
