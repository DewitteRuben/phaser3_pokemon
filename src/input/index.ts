import { Player } from "../classes/Player";
import { ANIM_KEY } from "../animations";
import { PLAYER_SPRITE_FRAME, dialogBoxSprite } from "../sprites";
import { DialogHandler } from "../dialog/DialogHandler";
import { Interactable } from "../classes/Interactable";
import { Menu } from "../classes/Menu";
import { BattleManager } from "../classes/BattleManager";
import { MoveFactory } from "../classes/MoveFactory";

export class InputHandler {
  private scene: Phaser.Scene;
  private player: Player;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private dialogHandler: DialogHandler;
  private menu: Menu;
  private battleManager: BattleManager;

  private wKey: Phaser.Input.Keyboard.Key;
  private xKey: Phaser.Input.Keyboard.Key;
  private aKey: Phaser.Input.Keyboard.Key;
  private backspaceKey: Phaser.Input.Keyboard.Key;
  private downKey: Phaser.Input.Keyboard.Key;
  private upKey: Phaser.Input.Keyboard.Key;

  constructor(
    scene: Phaser.Scene,
    player: Player,
    dialogHandler: DialogHandler,
    menu: Menu,
    battleManager: BattleManager
  ) {
    this.scene = scene;
    this.player = player;
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.dialogHandler = dialogHandler;
    this.menu = menu;
    this.battleManager = battleManager;
    this.setup();
  }

  setup(): void {
    this.wKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.xKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    this.aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.backspaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.BACKSPACE);
    this.upKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.downKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  }

  handleOverallInput(): void {
    if (Phaser.Input.Keyboard.JustDown(this.backspaceKey)) {
      this.menu.toggleSprite(!this.menu.isActive());
    }
    if (Phaser.Input.Keyboard.JustDown(this.aKey)) {
      this.battleManager.attack(MoveFactory.create("tackle"));
    }
  }

  handleDialogInput(): void {
    if (Phaser.Input.Keyboard.JustDown(this.wKey)) {
      this.dialogHandler.nextLine();
    }
  }

  handleMenuInput(): void {
    if (Phaser.Input.Keyboard.JustDown(this.downKey)) {
      this.menu.moveDown();
    } else if (Phaser.Input.Keyboard.JustDown(this.upKey)) {
      this.menu.moveUp();
    }
  }

  handleInteractInput(interactables: Interactable[]): void {
    interactables.forEach((interactable: Interactable) => {
      if (this.scene.physics.overlap(this.player.viewRadius.sprite, interactable.sprite.sprite)) {
        if (Phaser.Input.Keyboard.JustDown(this.wKey)) {
          interactable.interact(this.dialogHandler);
        }
      }
    });
  }

  handleMovementInput(): void {
    const arcadeBody = this.player.spriteSheet.sprite.body as Phaser.Physics.Arcade.Body;
    const prevVelocity = arcadeBody.velocity.clone();

    // Stop any previous movement from the last frame
    this.player.setVelocity(0);

    // toggle run speed
    if (this.xKey.isDown) {
      this.player.speed = Player.FAST_SPEED;
    } else {
      this.player.speed = Player.DEFAULT_SPEED;
    }

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-this.player.speed);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(this.player.speed);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-this.player.speed);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(this.player.speed);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    this.player.normalize(this.player.speed);

    // Update the animation last and give left/right animations precedence over up/down animations
    if (this.cursors.left.isDown) {
      this.player.spriteSheet.sprite.anims.play(ANIM_KEY.PLAYER_LEFT, true);
    } else if (this.cursors.right.isDown) {
      this.player.spriteSheet.sprite.play(ANIM_KEY.PLAYER_RIGHT, true);
    } else if (this.cursors.up.isDown) {
      this.player.spriteSheet.sprite.play(ANIM_KEY.PLAYER_UP, true);
    } else if (this.cursors.down.isDown) {
      this.player.spriteSheet.sprite.play(ANIM_KEY.PLAYER_DOWN, true);
    } else {
      this.player.spriteSheet.sprite.anims.stop();

      // If we were moving, pick and idle frame to use
      if (prevVelocity.x < 0) {
        this.player.spriteSheet.sprite.setTexture(
          this.player.spriteSheet.key,
          PLAYER_SPRITE_FRAME.LEFT
        );
      } else if (prevVelocity.x > 0) {
        this.player.spriteSheet.sprite.setTexture(
          this.player.spriteSheet.key,
          PLAYER_SPRITE_FRAME.RIGHT
        );
      } else if (prevVelocity.y < 0) {
        this.player.spriteSheet.sprite.setTexture(
          this.player.spriteSheet.key,
          PLAYER_SPRITE_FRAME.DOWN
        );
      } else if (prevVelocity.y > 0) {
        this.player.spriteSheet.sprite.setTexture(
          this.player.spriteSheet.key,
          PLAYER_SPRITE_FRAME.UP
        );
      }
    }
  }
}
