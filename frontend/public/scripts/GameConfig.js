import MainScene from "./Scene.js";
import BossUI from "./BossUI.js";
import PlayerUI from "./PlayerUI.js";
import ScoreBoardUI from "./ScoreboardUI.js";
import { WIDTH, HEIGHT } from "./constant.js";

var mainScene = new MainScene();
var bossUI = new BossUI();
var playerUI = new PlayerUI();
var scoreUI = new ScoreBoardUI();

var config = {
    mode: Phaser.Scale.FIT,
    type: Phaser.AUTO,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: WIDTH,
    height: HEIGHT,
    transparent: true,
    pixelArt: true,
    parent: "game",
    scene: [mainScene, bossUI, playerUI, scoreUI]

};

const game = new Phaser.Game(config);

