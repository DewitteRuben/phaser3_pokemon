import { Sprite } from "../classes/Sprite";
import { dialogBoxSprite } from "../sprites";
import * as config from "../config/config.json";
import { Typewriter } from "../classes/Typewriter";

export class DialogHandler {
  private dialogBox: Sprite = dialogBoxSprite;
  private scene: Phaser.Scene;
  public text: Phaser.GameObjects.Text;
  public body: Phaser.GameObjects.Sprite;
  private typewriter: Typewriter;

  private dialogues: { text: string; onComplete: () => void }[] = [];

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.typewriter = new Typewriter(scene, this);
  }

  loadSprite(): void {
    this.dialogBox.load(this.scene);
  }

  add(): void {
    this.body = this.dialogBox.add(this.scene, 160, 200);

    this.toggleSprite(false);
    this.body.setScrollFactor(0);
    this.body.setDepth(config.zIndexes.ui);
  }

  toggleSprite(bool: boolean): void {
    this.dialogBox.sprite.setVisible(bool);
  }

  update(): void {
    for (let index: number = 0; index < this.dialogues.length; index++) {
      const dialog: { text: string; onComplete: () => void } = this.dialogues[index];
      if (!this.typewriter.active) {
        this.write(dialog.text, dialog.onComplete);
        this.dialogues.splice(index, 1);
      }
    }
  }

  queue(text: string, onComplete?: () => any): void {
    this.dialogues.push({ text, onComplete });
  }

  private write(text: string, onComplete?: () => any): void {
    const xPos: number = this.dialogBox.sprite.x - this.dialogBox.sprite.width / 2 + 8;
    const yPos: number = this.dialogBox.sprite.y - this.dialogBox.sprite.height / 2 + 5;

    this.toggleSprite(true);
    this.typewriter.write(text, xPos, yPos, onComplete);
  }

  isActive(): boolean {
    return this.dialogBox.sprite.visible;
  }

  nextLine(): void {
    this.typewriter.nextLine();
  }
}
