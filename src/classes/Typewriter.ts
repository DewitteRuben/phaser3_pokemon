import * as config from "../config/config.json";
import { DialogHandler } from "../dialog/DialogHandler.js";

export class Typewriter {
  public active: boolean = false;
  private cursorPos: number = 0;
  private xOffset: number = 0;
  private yOffset: number = 0;

  private text: string;

  private chars: Phaser.GameObjects.Text[] = [];
  private scene: Phaser.Scene;
  private timer: NodeJS.Timeout;
  private pause: boolean = false;
  private currentChars: number = 0;

  private static MAX_RENDERED_CHARS: number = 88;
  private static MAX_XOFFSET: number = 265;

  private static X_OFFSET: number = 5;
  private static Y_OFFSET: number = 12;

  private static DEFAULT_CHAR_INTERVAL: number = 35;
  private static FAST_CHAR_INTERVAL: number = 5;

  private charInterval: number = Typewriter.DEFAULT_CHAR_INTERVAL;

  private dialogHandler: DialogHandler;

  private onComplete?: () => void;

  private config = {
    color: "black",
    fontFamily: "Consolas",
    fontSize: "11px"
  };

  constructor(scene: Phaser.Scene, dialogHandler: DialogHandler) {
    this.scene = scene;
    this.dialogHandler = dialogHandler;
  }

  private clearText(): void {
    this.chars.forEach((char: Phaser.GameObjects.Text) => {
      char.destroy();
    });
  }

  private callback(xStart: number, yStart: number): void {
    // stop timer when all characters have been rendered and the rendering is paused
    if (this.pause && this.cursorPos >= this.text.length) {
      clearInterval(this.timer);
      return;
    }

    if (this.pause) {
      this.timer = setTimeout(() => this.callback(xStart, yStart), this.charInterval);
      return;
    }

    // pause rendering when maximum characters in dialog have been achieved
    // pause rendering when all characters have been rendered
    if (this.currentChars > Typewriter.MAX_RENDERED_CHARS || this.cursorPos >= this.text.length) {
      this.pause = true;
    }

    const char = this.text.charAt(this.cursorPos);

    // Maximum characters on x-axis exceeded
    if (xStart + this.xOffset > Typewriter.MAX_XOFFSET) {
      // go to start on x-axis
      this.xOffset = 0;
      // go to next line on y-axis
      this.yOffset = Typewriter.Y_OFFSET;
    }

    const renderedChar = this.scene.add.text(
      xStart + this.xOffset,
      yStart + this.yOffset,
      char,
      this.config
    );

    this.xOffset += Typewriter.X_OFFSET;

    renderedChar.setScrollFactor(0);
    renderedChar.setDepth(config.zIndexes.text);

    this.chars.push(renderedChar);

    this.cursorPos++;
    this.currentChars++;

    this.timer = setTimeout(() => this.callback(xStart, yStart), this.charInterval);
  }

  write(text: string, xStart: number, yStart: number, onComplete?: () => any): void {
    this.text = text;
    this.onComplete = onComplete;
    this.active = true;
    this.callback(xStart, yStart);
  }

  private resetParameters(): void {
    this.currentChars = 0;
    this.xOffset = 0;
    this.yOffset = 0;
  }

  nextLine(): void {
    if (this.pause) {
      this.resetParameters();
      this.clearText();

      this.charInterval = Typewriter.DEFAULT_CHAR_INTERVAL;
      this.pause = false;

      if (this.cursorPos >= this.text.length) {
        this.cursorPos = 0;
        this.dialogHandler.toggleSprite(false);
        if (this.onComplete) {
          this.onComplete();
        }
        this.active = false;
      }
    } else {
      this.charInterval = Typewriter.FAST_CHAR_INTERVAL;
    }
  }
}
