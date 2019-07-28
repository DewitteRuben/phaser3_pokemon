import { pokeballSprite } from "../../../sprites";
import { Interactable } from "../../../classes/Interactable";
import * as translations from "../../../assets/translations/en.json";
import { startScene } from "../../../services/scene";

export const owPokeball = new Interactable(200, 100, pokeballSprite);
owPokeball.setScript(translations.OW_POKEBALL_1, OW_POKEBALL);
owPokeball.setScript("Test", () => {
  console.log("i have a penis");
});

function OW_POKEBALL() {
  const _this = this as Interactable;
  startScene("Battle", { player: _this.player });
}
