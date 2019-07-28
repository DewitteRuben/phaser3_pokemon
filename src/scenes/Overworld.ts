import { Player } from "../classes/Player";
import { InputHandler } from "../input";
import { Camera } from "../camera";
import { DialogHandler } from "../dialog/DialogHandler";
import { Interactable } from "../classes/Interactable";
import { pokeballSprite, menuSprite } from "../sprites";
import { Scene } from "phaser";
import { owPokeball } from "../objects/interactable/misc";
import { Menu } from "../classes/Menu";
import { BattleField } from "../classes/BattleField";
import { PokemonFactory } from "../classes/PokemonFactory";
import { BattleManager } from "../classes/BattleManager";

/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

export class Overworld extends Phaser.Scene {
  private map: Phaser.Tilemaps.Tilemap;
  private tileset: Phaser.Tilemaps.Tileset;
  private worldLayer: Phaser.Tilemaps.StaticTilemapLayer;
  private aboveLayer: Phaser.Tilemaps.StaticTilemapLayer;
  private belowLayer: Phaser.Tilemaps.StaticTilemapLayer;

  private interactables: Interactable[] = [];

  private inputHandler: InputHandler;
  private dialogHandler: DialogHandler;
  private menu: Menu;
  private player: Player;
  private camera: Camera;

  private debugText: Phaser.GameObjects.Text;

  private battleField: BattleField;
  private battleManager: BattleManager;

  constructor() {
    super({
      key: "Overworld"
    });
    this.player = new Player(this);
    this.dialogHandler = new DialogHandler(this);
    this.menu = new Menu(menuSprite);
    this.interactables.push(owPokeball);
    const bulba1 = PokemonFactory.create("bulbasaur", 100);
    const bulba2 = PokemonFactory.create("bulbasaur", 100);

    this.battleField = new BattleField();
    this.battleField.setAlly(bulba1);
    this.battleField.setAxis(bulba2);
    this.battleManager = new BattleManager(this.battleField);
  }

  preload(): void {
    this.menu.preload(this);
    this.player.loadSprite();
    this.dialogHandler.loadSprite();
    this.load.image("tiles", "./src/maps/red_tileset.png");
    this.load.tilemapTiledJSON("map", "./src/maps/testmap.json");

    this.interactables.forEach((interactable: Interactable) => {
      interactable.preload(this);
    });
  }

  create(): void {
    // define animations
    this.map = this.make.tilemap({ key: "map" });
    this.tileset = this.map.addTilesetImage("tileset", "tiles");

    this.belowLayer = this.map.createStaticLayer("Below Player", this.tileset, 0, 0);
    this.worldLayer = this.map.createStaticLayer("World", this.tileset, 0, 0);
    this.aboveLayer = this.map.createStaticLayer("Above Player", this.tileset, 0, 0);

    this.worldLayer.setCollisionByProperty({ collides: true });

    this.aboveLayer.setDepth(10);

    this.dialogHandler.add();

    this.menu.add(this, 240, 122);
    this.player.add(this, 200, 300);
    this.player.setCollider(this, this.worldLayer);

    // create all game objects
    this.interactables.forEach((interactable: Interactable) => {
      interactable.create(this, this.player);
    });

    this.player.loadAnimations(this);

    this.camera = new Camera(this.cameras.main);
    this.camera.follow(
      this.player.spriteSheet.sprite,
      this.map.widthInPixels,
      this.map.heightInPixels
    );

    this.inputHandler = new InputHandler(
      this,
      this.player,
      this.dialogHandler,
      this.menu,
      this.battleManager
    );

    // debug coords
    this.debugText = this.add.text(0, 0, "x: 0, y:0", { color: "black" });
    this.debugText.setScrollFactor(0);
    this.debugText.setDepth(1000);
  }

  update(): void {
    this.dialogHandler.update();

    if (!this.dialogHandler.isActive()) {
      this.inputHandler.handleOverallInput();
    }

    if (!this.dialogHandler.isActive() && !this.menu.isActive()) {
      this.inputHandler.handleMovementInput();
      this.inputHandler.handleInteractInput(this.interactables);
    } else {
      this.inputHandler.handleDialogInput();
      this.inputHandler.handleMenuInput();
    }

    // debug coords
    this.debugText.setText(
      `x: ${this.game.input.mousePointer.x.toFixed(3)}, y: ${this.game.input.mousePointer.y.toFixed(
        3
      )}`
    );

    this.battleManager.update();
  }
}
