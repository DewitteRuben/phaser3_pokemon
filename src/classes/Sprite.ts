export class Sprite {
  public key: string;
  public url: string;
  public physics: boolean;
  public sprite: Phaser.GameObjects.Sprite;

  constructor(key: string, url: string, physics: boolean) {
    this.url = url;
    this.key = key;
    this.physics = physics;
  }

  load(scene: Phaser.Scene) {
    scene.load.image(this.key, this.url);
  }

  add(scene: Phaser.Scene, x: number, y: number, frame?: number) {
    if (this.physics) {
      this.sprite = scene.physics.add.sprite(x, y, this.key, frame);
      const body = this.sprite.body as Phaser.Physics.Arcade.Body;
      body.setImmovable(true);
    } else {
      this.sprite = scene.add.sprite(x, y, this.key, frame);
    }
    return this.sprite;
  }
}
