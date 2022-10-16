// You can write more code here

/* START OF COMPILED CODE */

import Phaser from "phaser";
import VBCard from "../components/VBCard";
import BoyoVBs from "../consts/BoyoVBs";
import Keyboard from "../components/Keyboard/Keyboard";

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

interface KeysObject {
  [key: string]: Phaser.Input.Keyboard.Key;
}

let alphabetKeys: KeysObject;

export default class Level extends Phaser.Scene {
  constructor() {
    super("Level");
    /* START-USER-CTR-CODE */
    // Write your code here.
    /* END-USER-CTR-CODE */
  }

  cards: VBCard[] = [];
  currentCard: VBCard | undefined;
  keyboard: Keyboard | undefined;
  updateWord(letter: string): void {
    if (letter === ">" && this.keyboard) {
      this.keyboard.destroy();
      this.keyboard = undefined;
      return;
    }
    if (this.currentCard) {
      this.currentCard.setData(
        "guess",
        this.currentCard.getData("guess") + letter
      );
      this.currentCard.subtitleText.setText(this.currentCard.getData("guess"));
    }
  }

  editorCreate(): void {
    const theScene = this;
    function spawnCard() {
      // const randomSeed = Math.random();
      const randomSeedX = Math.random();
      const randomSeedY = Math.random();
      const x = 100 + randomSeedX * 500;
      const y = 100 + randomSeedY * 400;
      // choose a random VB
      const vb = BoyoVBs[Math.floor(Math.random() * BoyoVBs.length)];
      const theCard = new VBCard({
        title: vb.id.toString(),
        subtitle: "",
        text: vb.exp,
        image: "FufuSuperDino",
        x: 0,
        y: 0,
        scene: theScene,
      });
      theCard.setInteractive();
      theCard.setData("vb", vb.vb);
      theCard.setData("guess", "");
      theScene.input.setDraggable(theCard, true);
      theScene.tweens.add({
        targets: theCard,
        x: x,
        y: y,
        duration: 3000,
        ease: "Elastic",
        easeParams: [1.5, 0.5],
        delay: 0,
      });
      return theCard;
    }
    // fufuSuperDino
    this.cards = new Array(12).fill(0).map((_, i) => {
      const theCard = spawnCard();

      return theCard;
    });
    this.currentCard = this.cards[0];
    this.input.on(
      "drag",
      (
        _: Phaser.Input.Pointer,
        gameObject: Phaser.GameObjects.Container,
        dragX: number,
        dragY: number
      ) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
      }
    );
    this.input.on(
      Phaser.Input.Events.POINTER_DOWN,
      function (
        _: Phaser.Input.Pointer,
        gameObject: Array<Phaser.GameObjects.Container>
      ) {
        theScene.cards.every((card) => {
          card.setDepth(0);
          return true;
        });
        if (gameObject[0] instanceof VBCard) {
          gameObject[0].setDepth(1);
          console.log("clicked", gameObject);
          theScene.sound.playAudioSprite(
            "vbsounds",
            gameObject[0].getData("vb")
          );
          console.log(theScene.sound);
          theScene.currentCard = gameObject[0];
          if (!theScene.keyboard) {
            theScene.keyboard = new Keyboard(
              theScene,
              theScene.updateWord.bind(theScene)
            );
            theScene.add.existing(theScene.keyboard);
          }
        }
      }
    );
    alphabetKeys = this.input.keyboard.addKeys(
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ'".split("").join(",") +
        ",BACKSPACE,SPACE,MINUS,PERIOD,COMMA,QUOTES"
    ) as KeysObject;

    Object.keys(alphabetKeys).forEach((key) => {
      function upevent(event: Phaser.Input.Keyboard.Key) {
        if (!theScene.currentCard) return;
        const theCard = theScene.currentCard;
        switch (key) {
          case "PERIOD":
            theCard.setData("guess", theCard.getData("guess") + ".");
            break;
          case "COMMA":
            theCard.setData("guess", theCard.getData("guess") + ",");
            break;
          case "QUOTES":
            theCard.setData("guess", theCard.getData("guess") + "'");
            break;
          case "MINUS":
            theCard.setData(
              "guess",
              theCard.getData("guess") + "-"
            );
            break;
          case "BACKSPACE":
            theCard.setData(
              "guess",
              theCard.getData("guess").slice(0, -1)
            );
            break;
          case "SPACE":
            theCard.setData(
              "guess",
              theCard.getData("guess") + " "
            );
            break;
          default:
            theCard.setData(
              "guess",
              theCard.getData("guess") + key
            );
            break;
        }
        theCard.subtitleText.text =
          theCard.getData("guess");
        if (
          theCard.getData("guess").toUpperCase() ===
          theCard.getData("vb").toUpperCase()
        ) {
          theCard.titleText.text = "答對了!";
          theScene.tweens.add({
            targets: theCard,
            alpha: 0,
            flipX: true,
            duration: 1000,
            onComplete: () => {
              if (!theCard) return;
              theCard.destroy();
              theScene.cards.splice(
                theScene.cards.indexOf(theCard),
                1
              );
              if (theScene.cards.length === 0) {
                for (let i = 0; i < 12; i++) {
                  const newCard = spawnCard();
                  theScene.tweens.add({
                    targets: newCard,
                    scaleX: "*=0.8",
                    scaleY: "*=0.8",
                    duration: 80,
                    yoyo: true,
                  });
                  theScene.cards.push(newCard);
                }
              }
            },
          });
        } else {
          theCard.titleText.text = "還差一些喔!";
        }
      }
      alphabetKeys[key].addListener("up", upevent);
    });
    this.events.emit("scene-awake");
  }

  /* START-USER-CODE */

  // Write your code here

  create() {
    this.editorCreate();
  }

  update(): void {}
  /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
