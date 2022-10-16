// KEYBOARD LETTER


// this class extends BitmapText class
export default class KeyboardLetter extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    size: number
  ) {
    super(scene, x, y, text, { fontSize: `${size}px`, color: "#000" });
    scene.add.existing(this);
    this.setDepth(255);
  }
}
