export class Camera {
  private camera: Phaser.Cameras.Scene2D.Camera;

  constructor(camera: Phaser.Cameras.Scene2D.Camera) {
    this.camera = camera;
  }

  follow(
    object: Phaser.GameObjects.GameObject,
    borderWidth: number,
    borderHeight: number
  ) {
    this.camera.startFollow(object);
    this.camera.setBounds(0, 0, borderWidth, borderHeight);
  }
}
