import { Sprite } from "./Sprite";
import * as config from "../config/config.json";

export class Menu {
  private items: string[] = ["Pokémon", "Bag", "Save", "Option", "Exit"];
  private sprite: Sprite;
  private index: number = 0;
  private renderedItems: Phaser.GameObjects.Text[] = [];
  private options: { xStart: number; yStart: number; yOffset: number } = {
    xStart: 16,
    yStart: 13,
    yOffset: 15
  };

  private pointerSprite: Phaser.GameObjects.Text;

  constructor(sprite: Sprite, options?: { xStart: number; yStart: number; yOffset: number }) {
    this.sprite = sprite;
    if (options) {
      this.options = options;
    }
  }

  setItems(items: string[]): void {
    this.items = items;
  }

  preload(scene: Phaser.Scene): void {
    this.sprite.load(scene);
  }

  isActive(): boolean {
    let textActive: boolean = false;
    this.renderedItems.forEach((renderedItem: Phaser.GameObjects.Text) => {
      if (renderedItem.visible) {
        textActive = true;
      }
    });
    return this.sprite.sprite.visible && textActive && this.pointerSprite.visible;
  }

  toggleSprite(bool: boolean): void {
    this.sprite.sprite.setVisible(bool);
    this.pointerSprite.setVisible(bool);
    this.renderedItems.forEach((renderedItem: Phaser.GameObjects.Text) => {
      renderedItem.setVisible(bool);
    });
  }

  add(scene: Phaser.Scene, x: number, y: number): void {
    this.sprite.add(scene, x, y);
    this.sprite.sprite.setScrollFactor(0);

    const spriteWidth = this.sprite.sprite.width;
    const spriteHeight = this.sprite.sprite.height;
    const xStartPos = x - spriteWidth / 2 + this.options.xStart;
    const yStartPos = y - spriteHeight / 2 + this.options.yStart;

    this.items.forEach((text: string, index: number) => {
      const textObj = scene.add.text(
        xStartPos,
        yStartPos + this.options.yOffset * index,
        text,
        config.text
      );
      textObj.setScrollFactor(0);
      this.renderedItems.push(textObj);
    });

    this.pointerSprite = scene.add.text(xStartPos - 8, yStartPos, ">", config.text);
    this.pointerSprite.setScrollFactor(0);
    this.toggleSprite(false);
  }

  moveUp(): void {
    if (this.index > 0) {
      this.pointerSprite.y -= this.options.yOffset;
      this.index--;
    } else {
      const maxIndex: number = this.items.length - 1;
      this.pointerSprite.y += this.options.yOffset * maxIndex;
      this.index = maxIndex;
    }
  }

  moveDown(): void {
    const maxIndex: number = this.items.length - 1;

    if (this.index === maxIndex) {
      this.pointerSprite.y -= this.options.yOffset * maxIndex;
      this.index = 0;
    } else {
      this.pointerSprite.y += this.options.yOffset;
      this.index++;
    }
  }
}
