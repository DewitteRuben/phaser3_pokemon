import { SpriteSheet } from "./SpriteSheet";
import { Animation, playerDown, playerLeft, playerRight, playerUp } from "../animations";
import { playerSheet, viewSprite } from "../sprites";
import { Sprite } from "./Sprite";
import { Pokemon } from "./Pokemon";

export class Player {
  public spriteSheet: SpriteSheet = playerSheet;
  public speed: number = Player.DEFAULT_SPEED;
  public name: string = "Ruben";
  public scene: Phaser.Scene;
  public animations: Animation[] = [playerDown, playerLeft, playerRight, playerUp];

  public static DEFAULT_SPEED: number = 75;
  public static FAST_SPEED: number = 125;
  public static VIEW_RADIUS_OFFSET = 9;

  public pokemon: Set<Pokemon> = new Set([new Pokemon("Bulbasaur", 1)]);

  public viewRadius: Sprite = viewSprite;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  loadSprite(): void {
    this.spriteSheet.load(this.scene);
    this.viewRadius.load(this.scene);
  }

  setCollider(scene: Phaser.Scene, object: Phaser.GameObjects.GameObject): void {
    scene.physics.add.collider(this.spriteSheet.sprite, object);
  }

  add(scene: Phaser.Scene, x: number, y: number): void {
    this.spriteSheet.add(scene, x, y, 6);
    this.viewRadius.add(scene, x, y + Player.VIEW_RADIUS_OFFSET);
    this.viewRadius.sprite.setVisible(false);
  }

  loadAnimations(scene: Phaser.Scene): void {
    this.animations.forEach((animation: Animation) => {
      animation.load(scene);
    });
  }

  setVelocity(speed: number): void {
    const body = this.spriteSheet.sprite.body as Phaser.Physics.Arcade.Body;
    body.setVelocity(speed);
  }

  setVelocityX(speed: number): void {
    const body = this.spriteSheet.sprite.body as Phaser.Physics.Arcade.Body;
    body.setVelocityX(speed);

    viewSprite.sprite.setPosition(
      this.spriteSheet.sprite.x +
        (speed < 0 ? -Player.VIEW_RADIUS_OFFSET : Player.VIEW_RADIUS_OFFSET),
      this.spriteSheet.sprite.y
    );
  }

  setVelocityY(speed: number): void {
    const body = this.spriteSheet.sprite.body as Phaser.Physics.Arcade.Body;
    body.setVelocityY(speed);

    viewSprite.sprite.setPosition(
      this.spriteSheet.sprite.x,
      this.spriteSheet.sprite.y +
        (speed < 0 ? -Player.VIEW_RADIUS_OFFSET : Player.VIEW_RADIUS_OFFSET)
    );
  }

  normalize(scale: number): void {
    const body = this.spriteSheet.sprite.body as Phaser.Physics.Arcade.Body;
    body.velocity.normalize().scale(scale);
  }
}
