interface VBCardProps {
  title: string;
  subtitle: string;
  text: string;
  image: string;
  x: number;
  y: number;
  scene: Phaser.Scene;
}

const widthReal = 200;
const heightReal = 300;

let defaultCard: null | Phaser.GameObjects.Graphics = null;

export default class VBCard extends Phaser.GameObjects.Container {
  cardBackground: Phaser.GameObjects.Image;
  titleText: Phaser.GameObjects.Text;
  subtitleText: Phaser.GameObjects.Text;
  bodyText: Phaser.GameObjects.Text;
  constructor(options: VBCardProps) {
    super(options.scene, options.x, options.y);
    const { title, subtitle, text, image } = options;
    const width = widthReal;
    const height = heightReal;

    // draw the card
    if (defaultCard === null) {
      defaultCard = this.scene.add.graphics();
      defaultCard.fillStyle(0xffffff, 1);
      defaultCard.fillRoundedRect(0, 0, widthReal, heightReal, 10);
      defaultCard.lineStyle(2, 0x000000, 1);
      defaultCard.strokeRoundedRect(0, 0, widthReal, heightReal, 10);
      defaultCard.generateTexture("defaultCard", widthReal, heightReal);
      defaultCard.destroy();
    }

    const cardBackground = this.scene.add.image(0, 0, "defaultCard");

    const titleText = this.scene.add.text(0, 0, title, {
      fontSize: "32px",
      color: "#000",
    });
    titleText.setOrigin(0.5, 0);
    titleText.setPosition(0, 20 - height / 2);

    const subtitleText = this.scene.add.text(0, 0, subtitle, {
      fontSize: "24px",
      color: "#000",
    });
    subtitleText.setOrigin(0.5, 0);
    subtitleText.setPosition(0, 60 - height / 2);

    const bodyText = this.scene.add.text(0, 0, text, {
      fontSize: "18px",
      color: "#000",
    });
    bodyText.setOrigin(0.5, 0);
    bodyText.setPosition(0, 100 - height / 2);

    const imageObject = this.scene.add.image(0, 0, image);
    imageObject.setOrigin(0.5, 0);
    imageObject.setPosition(0, 140 - height / 2);
    imageObject.setScale(0.5, 0.5);

    this.add([cardBackground, titleText, subtitleText, bodyText, imageObject]);
    this.scene.add.existing(this);
    this.cardBackground = cardBackground;
    this.titleText = titleText;
    this.subtitleText = subtitleText;
    this.bodyText = bodyText;
    this.setSize(width, height);
  }
}
