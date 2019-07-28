import { SpriteSheet } from "./SpriteSheet";
import { Sprite } from "./Sprite";
import { DialogHandler } from "../dialog/DialogHandler";
import { Player } from "./Player";

export class Interactable {
  public sprite: SpriteSheet | Sprite;
  public x: number;
  public y: number;
  public scene: Phaser.Scene;
  public player: Player;

  private actions: { dialog: string; action: () => void }[] = [];

  constructor(x: number, y: number, sprite: SpriteSheet | Sprite) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
  }

  preload(scene: Phaser.Scene): void {
    this.sprite.load(scene);
  }

  create(scene: Phaser.Scene, player: Player, frame?: number): void {
    this.scene = scene;
    this.player = player;
    this.sprite.add(scene, this.x, this.y, frame);
    this.scene.physics.add.collider(player.spriteSheet.sprite, this.sprite.sprite);
  }

  setScript(dialog: string, action: () => void): void {
    this.actions.push({ dialog, action: action.bind(this) });
  }

  interact(dialogHandler: DialogHandler): void {
    for (let index = 0; index < this.actions.length; index++) {
      const script = this.actions[index];
      dialogHandler.queue(script.dialog, script.action);
    }
  }
}
