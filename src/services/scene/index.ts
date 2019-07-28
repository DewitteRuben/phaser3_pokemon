import { getInstance } from "../game";

export const addScene = (
  key: string,
  scene:
    | Function
    | Phaser.Scene
    | Phaser.Types.Scenes.SettingsConfig
    | Phaser.Types.Scenes.CreateSceneFromObjectConfig,
  data?: object
) => {
  getInstance().scene.add(key, scene, undefined, data);
};

export const startScene = (key: string, data?: object) => {
  getInstance().scene.start(key, data);
};