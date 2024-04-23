import { WIDTH, HEIGHT, OffsetFromOrigin, scale, scaleX, scale_m } from "./constant.js";
import { clickEvent, selectCardEvent, setupEvent } from "./eventCenter.js";
import Button from "./Button.js";
import Scoreboard from "./Scoreboard.js";
import { dataManager } from "./DataManager.js";
import { fetchChangeUserName, fetchUserItem, upgradeItem } from "./api.js";
import * as WebFontLoader from "../lib/WebFontLoader.js";

export default class PlayerUI extends Phaser.Scene {
  currentSelectedCardIndex;
  constructor() {
    super({ key: "PlayerUI", active: true });
    this.selectedCard = null;
    this.levelText = null;
    this.pointText = null;
    this.currentSelectedCardIndex = 0;
  }
  preload() {
    this.load.image("kuromaru", "./asset/kuromaru.webp");
    this.load.image("playerImg", "./asset/player.png");
    this.load.image("card1", "./asset/card1.webp");
    this.load.image("card2", "./asset/card2.webp");
    this.load.image("card3", "./asset/card3.webp");
    this.load.image("diamondSword", "./asset/diamond.webp");
    this.load.image("cppIcon", "./asset/cppIcon.webp");
    this.load.image("pythonIcon", "./asset/pythonIcon.webp");
    this.load.image("javaIcon", "./asset/javaIcon.webp");
    this.load.image("attack-particle", "./asset/par0.webp");
    this.load.image("attack-particle-2", "./asset/par1.webp");
    this.load.image("upgrade-button", "./asset/upgrade-button.png");

    //* load sprite sheet
    this.load.spritesheet("player-IDLE", "./asset/player-Sheet.png", {
      frameWidth: 256,
      frameHeight: 256,
    });
    this.load.spritesheet(
      "player-attack-1",
      "./asset/player-attack-Sheet.png",
      {
        frameWidth: 256,
        frameHeight: 256,
      }
    );
    this.load.spritesheet(
      "player-attack-2",
      "./asset/player-attack-left-Sheet.png",
      {
        frameWidth: 256,
        frameHeight: 256,
      }
    );

    // sfx
    this.load.audio("hit", "./asset/sfx/hit.wav");
    this.load.audio("select-card", "./asset/sfx/select.wav");
    this.load.audio("upgrade-card", "./asset/sfx/upgrade.wav");
    this.load.audio("un-upgrade-card", "./asset/sfx/unupgrade.wav");
  }

  async create() {
    //* set up event
    clickEvent.on("OnClick", this.onClickHandler, this);

    //* Setup player image
    this.player = this.add.sprite(
      WIDTH / 2,
      HEIGHT-150*scale,
      "player-IDLE"
    ).setScale(scale);

    this.userNameBtn = this.add.text(WIDTH/2, HEIGHT-270*scale, dataManager.store.values.userName).setOrigin(0.5, 0.5).setInteractive().setColor("#ffff00").setFontSize(32*scale);
    this.userNameBtn.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OVER,()=>{
      this.userNameBtn.setColor("#e3ba24");
    });
    this.userNameBtn.on(Phaser.Input.Events.GAMEOBJECT_POINTER_OUT,()=>{
      this.userNameBtn.setColor("#ffff00");
    });
    this.userNameBtn.on('pointerup', () => {
      const name = prompt("Please enter your name:", "");
      if (name != null && name.trim() !== "") {
          // TODO : change name api.
          dataManager.store.values.userName = name;
          this.userNameBtn.setText(name);
          fetchChangeUserName();
      } else {
          alert("Please enter a valid name!");
      }
    });

    this.anims.create({
      key: "player-Idle",
      frames: this.anims.generateFrameNumbers("player-IDLE"),
      frameRate: 4,
      repeat: -1,
    });

    this.anims.create({
      key: "player-Attack-1",
      frames: this.anims.generateFrameNumbers("player-attack-1"),
      frameRate: 10,
    });

    this.anims.create({
      key: "player-Attack-2",
      frames: this.anims.generateFrameNumbers("player-attack-2"),
      frameRate: 10,
    });
    this.player.play("player-Idle");

    //* Level text and Score text
    this.pointText = this.add
      .text(
        WIDTH+((WIDTH>HEIGHT)? -650*scale:-250),
        HEIGHT+((WIDTH>HEIGHT)? -350*scale:-150),
        `Score : ${formatNumber(dataManager.store.values.userScore)}`
      )
      .setFontFamily("Arial")
      .setFontSize(64)
      .setColor("#ffff00");

    let startOffsetX=300*scale;
    let diffX=150*scaleX;
    let offsetX = [0,0,0];
    let offsetY = [0,0,0];
    if(WIDTH>HEIGHT){
      offsetX = [-(startOffsetX+(2*diffX)),-(startOffsetX+diffX),-(startOffsetX)];
      offsetY = [-500*scale,-500*scale,-500*scale];
    }
    else{
      offsetX = [-100,-100,-100];
      offsetY = [-800,-550,-300];
    }

    let cardScale = (WIDTH>HEIGHT) ? .5*scale:.5;

    const item = await fetchUserItem();
    //* Card button
    var card1 = new Button(
      this,
      WIDTH+offsetX[0],
      HEIGHT+offsetY[0],
      cardScale,
      "cppIcon",
      "card01",
      item.item.item_0,
      0
    );
    this.add.existing(card1);
    card1.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {
      this.selectCardSound.play();
      this.selectCard(card1, 0);
    });

    var card2 = new Button(
      this,
      WIDTH+offsetX[1],
      HEIGHT+offsetY[1],
      cardScale,
      "pythonIcon",
      "card02",
      item.item.item_1,
      1
    );
    this.add.existing(card2);
    card2.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {

      this.selectCardSound.play();
      this.selectCard(card2, 1);
    });

    var card3 = new Button(
      this,
      WIDTH+offsetX[2],
      HEIGHT+offsetY[2],
      cardScale,
      "javaIcon",
      "card03",
      item.item.item_2,
      2
    );
    this.add.existing(card3);
    card3.on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, () => {

      this.selectCardSound.play();
      this.selectCard(card3, 2);
    });

    this.selectCard(card1, 0); // select card 1 as default

    //* hit sound
    this.hitSound = this.sound.add("hit").setVolume(0.2);
    this.selectCardSound = this.sound.add("select-card").setVolume(0.2);

    setInterval(async () => {
      await this.pointText.setText(
        `Score : ${formatNumber(dataManager.store.values.userScore)}`
      );
    }, 50);

    WebFontLoader.default.load({
      custom: {
        families: ["Kenny"],
      },
      active: () => {
        this.pointText.setFontFamily("Kenny");
        this.userNameBtn.setFontFamily("Kenny");
      },
    });

    this.attackPar = this.add.particles(0, 0, "attack-particle", {
      speed: 200,
      lifespan: 200,
      scale: { start: 0.5, end: 0 },
      speed: { min: 200, max: 350 },
      emitting: false,
    });
    this.attackPar2 = this.add.particles(0, 0, "attack-particle-2", {
      speed: 200,
      lifespan: 200,
      scale: { start: 0.5, end: 0 },
      speed: { min: 200, max: 350 },
      emitting: false,
    });
  }

  onClickHandler() {
    let inp = this.input.activePointer;
    this.attackPar.emitParticleAt(inp.x, inp.y, 2);
    this.attackPar2.emitParticleAt(inp.x, inp.y, 2);
    this.pointText.setText(
      `Score : ${formatNumber(dataManager.store.values.userScore)}`
    );
    // for animation
    let mode = getRndInteger(1, 2);
    this.player.play("player-Attack-" + mode);
    this.player.chain("player-Idle");
    //sound
    this.hitSound.play();
  }

  selectCard(clickedCard, ind) {
    dataManager.store.values.userDamage = clickedCard.damge;
    dataManager.store.values.userLang = ind;
    // If another card is already selected, disable it
    if (this.selectedCard !== null && this.selectedCard !== clickedCard) {
      this.selectedCard.whiteFill.setAlpha(0);
    }

    this.currentSelectedCardIndex = ind;
    // Update the selected card
    selectCardEvent.emit("OnSelectCard", ind);
    this.selectedCard = clickedCard;
    this.selectedCard.whiteFill.setAlpha(0.4);
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatNumber(num) {
  if (num < 1000) {
    // If the number is less than 1000, just convert it to a string and return.
    return num.toString();
  } else {
    // If the number is 1000 or greater, convert to a string in the format of "1.2k".
    // Divide the number by 1000 and use toFixed(1) to keep one decimal place.
    return (num / 1000).toFixed(1) + "k";
  }
}
