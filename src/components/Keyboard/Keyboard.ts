import KeyboardKey from "./KeyboardKey";

const keyboardLayout: string[] = ["QWERTYUIOP-", "ASDFGHJKL'", ">ZXCVBNM <"];
export default class Keyboard extends Phaser.GameObjects.Container {
  customKeys: KeyboardKey[] = [];
  handler: (letter:string) => void;

  constructor(scene: Phaser.Scene,handler: (letter:string) => void) {
    super(scene, 0, 0);
    scene.add.existing(this);
    this.handler = handler;
    this.createKeys();
  }

  createKeys() {
    keyboardLayout.forEach((row: string, index: number) => {
      // determine position of key sprites
      // some values are still hardcoded, and need to be optimized
      let rowWidth: number = 64 * row.length;
      let firstKeyPosition: number =
        ((this.scene.game.config.width as number) - rowWidth) / 2;

      // loop through string
      for (let i: number = 0; i < row.length; i++) {
        // get the i-th character
        let letter: string = row.charAt(i);

        // add the keyboard key
        this.customKeys.push(
          new KeyboardKey(
            this.scene,
            firstKeyPosition + i * 64 - (letter == ">" ? 31 : 0),
            (this.scene.game.config.height as number) - 200 + index * 64,
            row.charAt(i),
            this.handler
          )
        );
      }
    });
  }

  destroy(fromScene?: boolean | undefined): void {
    this.customKeys.forEach((key) => key.destroy());
    super.destroy(fromScene);
  }
}