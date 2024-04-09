import MainScene from "./Scene.js";
import { WIDTH,HEIGHT } from "./constant.js";

var mainScene = new MainScene();

var config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    scene: [mainScene]
};

const game = new Phaser.Game(config);

