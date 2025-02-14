import Phaser from "phaser";
import Level from "./scenes/Level";
import preloadAssetPackUrl from "../static/assets/preload-asset-pack.json";
import Preload from "./scenes/Preload";

class Boot extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload() {
    this.load.pack("pack", preloadAssetPackUrl);
    this.load.audioSprite("vbsounds", "assets/vb.json", [
      "assets/howler/VB.ogg",
      "assets/howler/VB.m4a",
    ]);
  }

  create() {
    this.scene.start("Preload");
  }
}

window.addEventListener("load", function () {
  const game = new Phaser.Game({
    width: 800,
    height: 1200,
    backgroundColor: "#2f2f2f",
    scale: {
      mode: Phaser.Scale.ScaleModes.FIT,
      autoCenter: Phaser.Scale.Center.CENTER_BOTH,
    },
    scene: [Boot, Preload, Level],
    // audio: {
    //   disableWebAudio: true,
    // },
  });

  game.scene.start("Boot");
});
