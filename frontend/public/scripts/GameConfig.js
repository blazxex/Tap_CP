import MainScene from "./Scene.js";
import BossUI from "./BossUI.js";
import PlayerUI from "./PlayerUI.js";
import { WIDTH,HEIGHT } from "./constant.js";

var mainScene = new MainScene();
var bossUI = new BossUI();
var playerUI = new PlayerUI();

var config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    transparent : true,
    pixelArt : true,

    scene: [mainScene,bossUI, playerUI]

};

const game = new Phaser.Game(config);

