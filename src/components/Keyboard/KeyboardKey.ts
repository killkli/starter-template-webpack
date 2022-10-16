// KEYBOARD KEY CLASS
import KeyboardLetter from "./keyboardLetter";

// this class extends Sprite class
export default class KeyboardKey extends Phaser.GameObjects.Sprite {
  // letter bound to the key
  boundLetter: string;

  // parent scene
  parentScene: Phaser.Scene;

  textItem: Phaser.GameObjects.Text;

  handler: (letter: string) => void;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    letter: string,
    handler: (letter: string) => void
  ) {
    // different image key according if it's a letter character or '<' or '>'
    super(scene, x, y, "<>".includes(letter) ? "bigkey" : "key");
    this.handler = handler;

    // assign parent scene
    this.parentScene = scene;

    // assign bound letter
    this.boundLetter = letter;

    // set sprite registration point to top, left
    this.setOrigin(0);

    // add the sprite to the scene
    scene.add.existing(this);

    // set the sprite interactive
    this.setInteractive();

    // listener for pointer down on the sprite, to call handlePointer callback
    this.on("pointerdown", this.handlePointer);
    this.on("pointerup", this.handlePointerUp);
    this.setDepth(255);
    this.setAlpha(0.8)

    // add a keyboard letter accoring to 'letter value
    switch (letter) {
      case "<":
        this.textItem = new KeyboardLetter(scene, x + 10, y + 10, "DELETE", 18);
        break;
      case ">":
        this.textItem = new KeyboardLetter(scene, x + 10, y + 10, "SUBMIT", 18);
        break;
      default:
        this.textItem = new KeyboardLetter(scene, x + 10, y + 10, letter, 36);
    }
  }

  // method to be called when the user clicks or taps the letter
  handlePointer(): void {
    // call 'updateWord' method on parent scene
    this.handler(this.boundLetter);
    this.setAlpha(1);
  }

  handlePointerUp(): void {
    this.setAlpha(0.8);
  }

  destroy(fromScene?: boolean | undefined): void {
    this.textItem.destroy();
    super.destroy(fromScene);
  }
}
