export class SpriteSheet {
  public x: number;
  public y: number;
  public key: string;
  public url: string;
  public sprite: Phaser.GameObjects.Sprite;
  public config: Phaser.Types.Loader.FileTypes.ImageFrameConfig;
  public physics: boolean;

  constructor(
    key: string,
    url: string,
    physics: boolean,
    config: Phaser.Types.Loader.FileTypes.ImageFrameConfig
  ) {
    this.key = key;
    this.url = url;
    this.config = config;
    this.physics = physics;
  }

  load(scene: Phaser.Scene) {
    scene.load.spritesheet(this.key, this.url, this.config);
  }

  add(scene: Phaser.Scene, x: number, y: number, frame?: number) {
    if (this.physics) {
      this.sprite = scene.physics.add.sprite(x, y, this.key, frame);
    } else {
      this.sprite = scene.add.sprite(x, y, this.key, frame);
    }
    return this.sprite;
  }
}
